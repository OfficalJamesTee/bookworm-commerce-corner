import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, UserPlus, LogIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot-password">("login");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Forgot password form
  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }
    
    toast.success("Login successful!");
    navigate('/');
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    const { error } = await signUp(data.email, data.password);
    
    if (error) {
      toast.error(error.message || "Signup failed");
      return;
    }
    
    toast.success("Account created successfully!");
    setActiveTab("login");
  };

  const onForgotPasswordSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password data:", data);
    // In a real app, you would handle password reset here
    toast.success("Password reset link sent to your email!");
    setActiveTab("login");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
            
            <h1 className="text-2xl font-bold text-center mb-6">
              Welcome to Bookworm
            </h1>
            
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as "login" | "signup" | "forgot-password")} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="you@example.com" className="pl-10" {...field} />
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
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input type="password" placeholder="••••••" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-sm text-right">
                      <button 
                        type="button"
                        onClick={() => setActiveTab("forgot-password")}
                        className="text-bookstore-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <LogIn className="h-4 w-4 mr-2" /> Login
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="you@example.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input type="password" placeholder="••••••" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input type="password" placeholder="••••••" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg">
                      <UserPlus className="h-4 w-4 mr-2" /> Create Account
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="forgot-password">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Reset your password</h2>
                  <p className="text-gray-500">Enter your email and we'll send you a link to reset your password.</p>
                </div>
                <Form {...forgotPasswordForm}>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="you@example.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-2">
                      <Button type="submit" className="w-full" size="lg">
                        Send Reset Link <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setActiveTab("login")}
                      >
                        Back to Login
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="text-bookstore-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : activeTab === "signup" ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-bookstore-primary hover:underline font-medium"
                  >
                    Login
                  </button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
