import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FilmIcon, Lock, Mail } from "lucide-react";
import { GoogleIcon } from "../../../lib/icons";
import { useEffect } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function LoginPage() {
  useEffect(() => {
    document.title === "Sign in to Film.io";
  }, []);

  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      {/* Card */}
      <div className="flex flex-col w-100 h-fit px-5 py-10 items-center justify-center rounded-lg bg-slate-800 shadow-md">
        <section className="flex flex-col w-full h-fit items-center justify-center pb-5">
          <FilmIcon size={50} />
          <h1 className="flex w-full justify-center text-2xl font-sans pt-3 font-semibold">
            Film.io
          </h1>
          <h2 className="pb-2 flex text-center text-md font-extralight">
            Please sign in to your account.
          </h2>
        </section>
        <form action={""} className="flex w-full h-fit">
          <FieldGroup className="flex flex-col w-full h-full gap-3">
            <Field orientation={"vertical"}>
              <Button
                variant={"default"}
                className="flex w-full cursor-pointer bg-(--color-brand-teal) rounded-lg hover:bg-teal-500 active:bg-teal-600"
                type="submit"
                size={"default"}
                id="email-button"
              >
                <Mail size={15} className="min-w-3 h-auto text-(--color-brand-black-light)"/>
                <p className="text-(--color-brand-black-light) font-semibold">
                  Sign in using email
                </p>
              </Button>
            </Field>
            <Field>
              <Button
                type="button"
                variant={"secondary"}
                className="border-(--color-brand-teal) border rounded-lg gap-3 cursor-pointer hover:bg-(--color-brand-teal)/50 active:bg-(--color-brand-teal) active:text-(--color-brand-black-light)"
                id="google-button"
              >
                <GoogleIcon />
                <p>Sign in using Google</p>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
