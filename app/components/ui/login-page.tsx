import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FilmIcon, Lock } from "lucide-react";
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
      <div className="flex flex-col w-100 h-fit p-5 items-center justify-center rounded-lg">
        <FilmIcon size={50} />
        <h1 className="flex w-full justify-center text-xl font-sans py-3 font-extralight">
          Sign in to <span className="font-semibold">&nbsp;Film.io</span>
        </h1>
        <form action={""} className="flex w-full h-fit">
          <FieldGroup className="flex flex-col w-full h-full gap-4">
            <Field orientation={"vertical"} className="py-5 gap-2">
              <FieldLabel htmlFor="email" className="line-clamp-1">
                Email address
              </FieldLabel>
              <InputGroup id="email" className="min-w-full h-fit flex rounded-lg border border-white/50"> 
                <InputGroupAddon align="inline-start" className="text-white/50">
                    <Lock size={25}/>
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  placeholder="sample@gmail.com"
                />
              </InputGroup>
            </Field>
            <Field orientation={"vertical"}>
              <Button
                variant={"default"}
                className="flex w-full cursor-pointer bg-(--color-brand-teal) rounded-lg"
                type="submit"
                size={"default"}
              >
                <p className="text-(--color-brand-black-light) font-semibold">
                  Sign in
                </p>
              </Button>
            </Field>
            <Field>
              <Button
                type="button"
                variant={"secondary"}
                className="border-(--color-brand-teal) border rounded-lg gap-3 cursor-pointer hover:bg-(--color-brand-teal)/50 active:bg-(--color-brand-teal) active:text-(--color-brand-black-light)"
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
