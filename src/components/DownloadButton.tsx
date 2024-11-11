import { ref, listAll, getDownloadURL } from "firebase/storage";
import JSZip from "jszip";
import { storage } from "../utils/firebase";
import Button from "./Button";
import { saveAs } from "file-saver";
import { useState } from "react";
import axios from "axios";

const DownloadFilesButton = ({ pathFile, download, paymentId, onProgress }) => {
  const [buttonText, setButtonText] = useState("Descargar");
  const [loading, setLoading] = useState(false);

  const getFilesFromFolder = async (folderPath) => {
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

  const downloadAndZipFiles = async (downloadUrls) => {
    onProgress(10);
    const zip = new JSZip();
    let completedFiles = 0;

    await Promise.all(
      downloadUrls.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const urlObj = new URL(url);
        let fileName = urlObj.pathname.split("/").pop();
        fileName = decodeURIComponent(fileName.split("?")[0]);

        zip.file(fileName, blob);

        // Calculate progress
        completedFiles += 1;
        const progress = (completedFiles / downloadUrls.length) * 100;
        onProgress(progress);
      })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${pathFile}.zip`);
  };

  const handleDownloadFolder = async () => {
    setLoading(true);
    setButtonText("Descargando...");

    try {
      const downloadUrls = await getFilesFromFolder(pathFile);
      await downloadAndZipFiles(downloadUrls);
      setButtonText("Descargado!");

      await axios.post("/api/payment-download-update", {
        paymentId,
        download: download + 1,
      });
    } catch (error) {
      console.error("Error downloading folder:", error);
      setButtonText("Error");
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
