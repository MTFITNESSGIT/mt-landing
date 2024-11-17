import { ref, listAll, getDownloadURL } from "firebase/storage";
import JSZip from "jszip";
import { storage } from "../utils/firebase";
import Button from "./Button";
import { saveAs } from "file-saver";
import { useState } from "react";
import axios from "axios";
import { IDownloadFilesButtonProps } from "@/types";

const DownloadFilesButton = ({
  pathFile,
  download,
  paymentId,
  onProgress,
  progress,
  folderName,
}: IDownloadFilesButtonProps) => {
  const [buttonText, setButtonText] = useState("Descargar");
  const [loading, setLoading] = useState(false);

  const getFilesFromFolder = async (folderPath: string) => {
    const folderRef = ref(storage, folderPath);

    try {
      const result = await listAll(folderRef);
      const downloadUrls = await Promise.all(
        result.items.map(async (itemRef) => {
          return await getDownloadURL(itemRef);
        })
      );

      return downloadUrls;
    } catch (error) {
      console.error("Error fetching folder files:", error);
      throw error;
    }
  };

  const downloadAndZipFiles = async (downloadUrls: string[]) => {
    onProgress(10);
    setButtonText(`Descargando: ${progress}%`);

    const zip = new JSZip();
    let completedFiles = 0;

    await Promise.all(
      downloadUrls.map(async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const urlObj = new URL(url);
        let fileName = urlObj.pathname.split("/").pop();

        if (!fileName) {
          fileName = "default_filename";
        } else {
          fileName = decodeURIComponent(fileName.split("?")[0]);
        }

        zip.file(fileName, blob);

        // Calculate progress
        completedFiles += 1;
        const progress = Math.round(
          (completedFiles / downloadUrls.length) * 100
        );
        onProgress(progress);
        setButtonText(`Descargando: ${progress}%`);
      })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${folderName}.zip`);
  };

  const handleDownloadFolder = async () => {
    setLoading(true);
    setButtonText(`Descargando: ${progress}%`);

    try {
      const downloadUrls = await getFilesFromFolder(pathFile);
      await downloadAndZipFiles(downloadUrls);
      setButtonText("Descargado!");

      await axios.post("/api/payment-download-update", {
        paymentId,
        download: download + 1,
      });
    } catch (error) {
      setButtonText("Error");
      console.error(error);
      throw new Error("Error downloading folder:");
    } finally {
      setLoading(false);
      setTimeout(() => setButtonText("Descargar"), 3000);
    }
  };

  return (
    <Button
      text={buttonText}
      onClick={handleDownloadFolder}
      background="bg-red"
      textColor="#fff"
      disabled={loading}
    />
  );
};

export default DownloadFilesButton;
