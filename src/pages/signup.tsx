import { SignUpForm } from "@/components/signup-form";

export default function SignUp() {
  return (
    <section className="flex items-center justify-center flex-col md:shadow-md shadow-violet-200 md:border md:mt-10 min-h-screen md:min-h-[80vh] px-10 md:py-10 md:px-16 max-w-lg w-full mx-auto gap-10">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="font-bold text-xl text-gray-700 md:text-2xl">
          Create your account!
        </h1>
        <p className="text-md text-muted-foreground">
          Let's get started with unlimited access of data & information
        </p>
      </div>
      <SignUpForm />
    </section>
  );
}
