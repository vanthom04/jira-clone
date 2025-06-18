"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { loginSchema } from "../schemas"
import { useLogin } from "../api/use-login"

export const SignInCard = () => {
  const { mutate, isPending } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center px-7">
        <CardTitle className="text-2xl">
          Welcome back!
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 flex flex-col gap-y-4">
        <Button
          size="lg"
          className="w-full"
          variant="secondary"
          disabled={isPending}
          onClick={() => signUpWithGoogle()}
        >
          <FcGoogle className="size-5" />
          Login with Google
        </Button>
        <Button
          size="lg"
          className="w-full"
          variant="secondary"
          disabled={isPending}
          onClick={() => signUpWithGithub()}
        >
          <FaGithub className="size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
