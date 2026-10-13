"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FilmIcon } from "lucide-react";

export default function Login() {
  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      {/* Card */}
      <div className="flex flex-col w-100 h-fit p-5 items-center justify-center rounded-lg">
        <FilmIcon size={50} />
        <h1 className="flex w-full justify-center text-xl font-sans py-3">
          Sign in to Film.io
        </h1>
        <form action={""} className="flex w-full h-fit">
          <FieldGroup className="flex flex-col w-full h-full gap-4">
            <Field orientation={"vertical"}>
              <FieldLabel htmlFor="email" className="line-clamp-1">
                Email
              </FieldLabel>
              <Input
                type="text"
                className="flex w-full rounded-lg border border-white/50"
                placeholder="Email address"
              ></Input>
            </Field>
            <Field orientation={"vertical"}>
              <Button
                variant={"default"}
                className="flex w-full cursor-pointer bg-(--color-brand-teal) rounded-lg"
                type="submit"
                size={"default"}
              >
                Sign in
              </Button>
            </Field>
            <Field>
              <div className="relative flex w-full h-fit">
                <hr className="border-0 bg-white"/>
                <h2 className="flex text-sm">
                  or sign in using the providers below
                </h2>
              </div>
              <div className="flex w-full items-center justify-center">
                
              </div>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
