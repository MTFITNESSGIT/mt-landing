"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LogOut,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useUsers } from "@/hooks/usePayments";
import { Skeleton } from "@/components/ui/skeleton";
import { withAuth } from "@/components/withAuth";

function DashboardContent() {
  const { data, isLoading, error } = useUsers();

  const totalPayments = data?.length || 0;
  const totalAmount =
    data?.reduce(
      (sum: number, payment: any) => sum + (payment.amount || 0),
      0
    ) || 0;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="h-full w-full bg-white">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="font-semibold text-gray-900">
              MT Fitness Dashboard
            </span>

            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-black"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 gap-2 flex justify-center">
            <span className="inline-block">👋</span>
            <span className="text-red ">Hola Tomy!</span>
          </h1>
          <p className="text-xl text-gray-600 animate-slide-up">
            Bienvenido a tu panel de control de pagos
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Payments Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Pagos
              </CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-blue-900 animate-count-up">
                  {totalPayments}
                </div>
              )}
              <p className="text-xs text-blue-600 mt-1">Pagos registrados</p>
            </CardContent>
          </Card>

          {/* Total Amount Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Total Recaudado
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold text-green-900 animate-count-up">
                  ${totalAmount.toLocaleString()}
                </div>
              )}
              <p className="text-xs text-green-600 mt-1">Ingresos totales</p>
            </CardContent>
          </Card>

          {/* Average Payment Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Promedio por Pago
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold text-purple-900 animate-count-up">
                  $
                  {totalPayments > 0
                    ? Math.round(totalAmount / totalPayments).toLocaleString()
                    : 0}
                </div>
              )}
              <p className="text-xs text-purple-600 mt-1">Pago promedio</p>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">
                Estado del Sistema
              </CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {error ? "Error" : "Activo"}
              </div>
              <p className="text-xs text-orange-600 mt-1">
                {error ? "Revisar conexión" : "Sistema operativo"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Gestiona tus pagos y clientes desde aquí
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="max-w-lg flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                <Link href="/dashboard/pagos">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Ver Tabla de Pagos
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default withAuth(DashboardContent);
