/**
 * ContactPage.tsx
 * @file ContactPage.tsx
 * @description Contact page: my e-mail address and a form sent with EmailJS.
 */

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  Send,
  TriangleAlert,
} from "lucide-react";

import Watermark from "./brand/Watermark";
import { buttonClasses } from "./ui/button";
import { cn } from "../lib/cn";
import {
  CONTACT_EMAIL,
  EMAILJS,
  MESSAGE_MAX_LENGTH,
  SEND_COOLDOWN_MS,
} from "../config";

const [emailUser, emailDomain] = CONTACT_EMAIL.split("@");

/**
 * Time of the last message sent from this browser. Storage can be missing
 * or blocked (private mode), in which case there is simply no delay.
 */
const LAST_SENT_KEY = "contact-last-sent";

const readLastSent = (): number => {
  try {
    return Number(window.localStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeLastSent = (time: number) => {
  try {
    window.localStorage.setItem(LAST_SENT_KEY, String(time));
  } catch {
    // Nothing to do: the delay only applies when storage is available
  }
};

interface ContactValues {
  name: string;
  email: string;
  message: string;
  website: string;
}

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = { kind: "success" | "warning" | "error"; text: string } | null;

const emptyValues: ContactValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Errors of the form, in the order of its fields
 */
const validate = (values: ContactValues): FieldErrors => {
  const errors: FieldErrors = {};
  if (!values.name.trim()) {
    errors.name = "Veuillez entrer votre nom";
  }
  if (!values.email.trim()) {
    errors.email = "Veuillez entrer votre adresse e-mail";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Veuillez entrer une adresse e-mail valide";
  }
  if (!values.message.trim()) {
    errors.message = "Veuillez entrer votre message";
  }
  return errors;
};

const SUCCESS: Status = {
  kind: "success",
  text: "Votre message a bien été envoyé !",
};

const statusStyles = {
  success: { Icon: CircleCheck, color: "text-success" },
  warning: { Icon: TriangleAlert, color: "text-warning" },
  error: { Icon: CircleAlert, color: "text-destructive" },
};

const fieldClasses =
  "w-full rounded-md border border-input bg-background px-3.5 text-base transition-[border-color] duration-150 ease-soft placeholder:text-muted-foreground hover:border-border-strong aria-invalid:border-destructive";

/**
 * ContactPage component.
 * Renders a contact form and contact information.
 */
const ContactPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  const update =
    (field: keyof ContactValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setValues((previous) => ({ ...previous, [field]: value }));
      // An error goes away as soon as the field is corrected
      setErrors((previous) =>
        previous[field as FieldName]
          ? { ...previous, [field]: undefined }
          : previous
      );
    };

  /**
   * handleMailSending function
   * @param e submit event of the form
   */
  const handleMailSending = (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Only bots fill the hidden field: nothing is sent, and nothing tells them so
    if (values.website) {
      setStatus(SUCCESS);
      setValues(emptyValues);
      return;
    }

    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      const field = formRef.current?.elements.namedItem(firstInvalid);
      (field as HTMLElement | null)?.focus();
      return;
    }

    const wait = readLastSent() + SEND_COOLDOWN_MS - Date.now();
    if (wait > 0) {
      setStatus({
        kind: "warning",
        text: `Votre précédent message vient de partir. Merci de patienter encore ${Math.ceil(
          wait / 1000
        )} s avant d'en envoyer un autre.`,
      });
      return;
    }

    setSending(true);
    emailjs
      .send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: values.name,
          email: values.email,
          message: values.message,
          // Shown in the e-mail as {{time}}, in French time whatever the visitor's zone
          time: new Date().toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Europe/Paris",
          }),
        },
        { publicKey: EMAILJS.publicKey }
      )
      .then(
        () => {
          writeLastSent(Date.now());
          setStatus(SUCCESS);
          setValues(emptyValues);
        },
        (error) => {
          setStatus({
            kind: "error",
            text:
              "Une erreur est survenue lors de l'envoi du message : " +
              error.text,
          });
        }
      )
      .finally(() => setSending(false));
  };

  /**
   * Label, control and error of a field, linked for screen readers
   */
  const errorProps = (field: FieldName) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const fieldError = (field: FieldName) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[field]}
      </p>
    );

  const StatusIcon = status && statusStyles[status.kind].Icon;

  return (
    <div className="relative isolate overflow-hidden">
      <Watermark className="top-10 -right-[14%] h-[24rem] md:h-[34rem]" />
      {/* On a laptop the page fits the screen with its footer, even 1366 x 768: no scroll for a form */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-8">
        <div className="animate-rise">
          <h1 className="text-2xl leading-[1.2] sm:text-3xl sm:leading-[1.15] md:text-4xl md:leading-[1.1]">
            Mon profil vous intéresse&nbsp;? <br />
            Contactez-moi
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Ensemble, faisons progresser le monde...
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 flex max-w-md items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card transition-[border-color,transform] duration-200 ease-soft hover:-translate-y-0.5 hover:border-border-strong"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted">
              <Mail strokeWidth={1.75} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted-foreground">
                Envoyez-moi un e-mail à
              </span>
              {/* Breaks only before the @ when the card is too narrow */}
              <span className="block font-semibold">
                <span className="whitespace-nowrap">{emailUser}</span>
                <wbr />
                <span className="whitespace-nowrap">@{emailDomain}</span>
              </span>
            </span>
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleMailSending}
          noValidate
          aria-labelledby="contact-form-title"
          className="w-full max-w-lg animate-rise rounded-lg border border-border bg-card p-5 shadow-card md:p-6 lg:justify-self-end"
        >
          <h2 id="contact-form-title" className="text-lg md:text-xl">
            Envoyez un message ici
          </h2>

          <div className="mt-5 space-y-4 lg:mt-4 lg:space-y-3">
            {/* Side by side on a laptop: the page then fits a 1280 x 650 window */}
            <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Nom
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Votre nom"
                value={values.name}
                onChange={update("name")}
                className={cn(fieldClasses, "mt-1.5 h-11 md:h-10")}
                {...errorProps("name")}
              />
              {fieldError("name")}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.fr"
                value={values.email}
                onChange={update("email")}
                className={cn(fieldClasses, "mt-1.5 h-11 md:h-10")}
                {...errorProps("email")}
              />
              {fieldError("email")}
            </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="message" className="text-sm font-semibold">
                  Message
                </label>
                <span
                  id="message-count"
                  className="text-xs text-muted-foreground tabular-nums"
                >
                  {values.message.length} / {MESSAGE_MAX_LENGTH}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                maxLength={MESSAGE_MAX_LENGTH}
                placeholder="Votre message"
                value={values.message}
                onChange={update("message")}
                className={cn(fieldClasses, "mt-1.5 block min-h-28 max-h-56 resize-y py-2.5")}
                {...errorProps("message")}
              />
              {fieldError("message")}
            </div>
          </div>

          {/* Trap for bots: off screen, out of the tab order and hidden from screen readers */}
          <div aria-hidden className="absolute -left-[10000px] size-px overflow-hidden">
            <label htmlFor="website">Site web</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={update("website")}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={buttonClasses({ className: "mt-6 w-full sm:w-auto" })}
          >
            {sending ? (
              <LoaderCircle strokeWidth={1.75} className="animate-spin" />
            ) : (
              <Send strokeWidth={1.75} />
            )}
            {sending ? "Envoi en cours" : "Envoyer"}
          </button>

          <p role="status" className="mt-4 flex items-start gap-2 text-sm empty:mt-0">
            {status && StatusIcon && (
              <>
                <StatusIcon
                  strokeWidth={1.75}
                  className={cn(
                    "mt-px size-4 shrink-0",
                    statusStyles[status.kind].color
                  )}
                />
                <span className={statusStyles[status.kind].color}>
                  {status.text}
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
