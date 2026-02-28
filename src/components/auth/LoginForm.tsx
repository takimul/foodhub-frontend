// "use client";

// import { useRouter } from "next/navigation";
// import { useForm } from "@tanstack/react-form";
// import { z } from "zod";
// import { toast } from "sonner";
// import { authClient } from "@/src/lib/auth-client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import { Input } from "@/src/components/ui/input";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Minimum 6 characters"),
// });

// export function LoginForm() {
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     validators: {
//       onSubmit: loginSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Logging in...");

//       try {
//         const { error } = await authClient.signIn.email({
//           email: value.email,
//           password: value.password,
//         });

//         if (error) {
//           toast.error(error.message, { id: toastId });
//           return;
//         }

//         toast.success("Login successful", { id: toastId });

//         router.refresh();
//         router.push("/");
//       } catch {
//         toast.error("Something went wrong", { id: toastId });
//       }
//     },
//   });

//   return (
//     <Card className="w-[420px]">
//       <CardHeader>
//         <CardTitle>Login</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//           className="space-y-4"
//         >
//           <form.Field
//             name="email"
//             children={(field) => (
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             )}
//           />

//           <form.Field
//             name="password"
//             children={(field) => (
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             )}
//           />

//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");

      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          // 👇 Suspended account message handling
          if (error.message?.toLowerCase().includes("suspend")) {
            toast.error("Your account is suspended. Contact admin.", {
              id: toastId,
            });
            return;
          }

          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Login successful", { id: toastId });

        router.refresh();
        router.push("/");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* EMAIL FIELD */}
          <form.Field
            name="email"
            children={(field) => (
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* PASSWORD FIELD */}
          <form.Field
            name="password"
            children={(field) => (
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
