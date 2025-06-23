import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Leaf, Lock, Mail, User, Phone } from "lucide-react";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    displayName: z.string().min(3, "Display Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [_, navigate] = useLocation();
  const { user, login, register, checkEmailExists} = useAuth();

  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLoginSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    setLoginLoading(true);
    try {
      await login(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to login");
    } finally {
      setLoginLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
  setErrorMessage(null);
  setRegisterLoading(true);
  try {
    const { confirmPassword, ...userData } = data;
    console.log("Registering with:", userData);
    await register(userData);
} catch (error: any) {
  console.log("Register Error:", error);

  if (error.response) {
    console.log("Status Code:", error.response.status);
    console.log("Full Response Data:", JSON.stringify(error.response.data, null, 2));
  }

  if (error.response?.data?.errors) {
    error.response.data.errors.forEach((err: string) => {
      if (err.toLowerCase().includes("password")) {
        registerForm.setError("password", { message: err });
      } else {
        setErrorMessage(err);
      }
    });
  } else {
    setErrorMessage(error.message || "Failed to register");
  }
}finally {
    setRegisterLoading(false);
  }
};

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-primary/5 to-transparent">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-primary/10"></div>
          <div className="absolute -right-16 top-3/4 w-48 h-48 rounded-full bg-secondary/10"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full p-12 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-2/3  relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Dr.Plant</h1>
            <p className="text-gray-600 text-center mb-8">Your plant health partner for happier, healthier plants</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Expert Plant Diagnosis</h3>
                  <p className="text-sm text-gray-600">AI-powered analysis of plant health issues</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Premium Plant Selection</h3>
                  <p className="text-sm text-gray-600">Curated collection of healthy, thriving plants</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Personalized Care Tips</h3>
                  <p className="text-sm text-gray-600">Custom advice for your specific plants</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome</h1>
            <p className="text-gray-600 mt-2">
              Sign in to your account or create a new one
            </p>
          </div>

          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            {/* Login Tab */}
            <TabsContent value="login" className="mt-0">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-6"
                >
                  <FormField control={loginForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input type="email" placeholder="Enter your email"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {errorMessage && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    className="text-primary hover:underline font-medium"
                    onClick={() => setActiveTab("register")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="mt-0">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                              onBlur={async () => {
                                if (field.value) {
                                  const exists = await checkEmailExists(field.value);
                                  if (exists) {
                                    registerForm.setError("email", {
                                      message: "Email already exists",
                                    });
                                  } else {
                                    registerForm.clearErrors("email");
                                  }
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              placeholder="01012345678"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                            <div className="px-3 py-2 bg-gray-50">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {errorMessage && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={registerLoading}
                  >
                    {registerLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
