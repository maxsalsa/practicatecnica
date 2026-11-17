import * as React from "react";
import { render } from "@react-email/render";
import { TEMPLATES } from "./registry";

const SITE_NAME = "pracTICAtecnica · GICM";
const FROM_ADDRESS = "no-responder@practicatecnica.com";

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: "recipient_suppressed" };

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>;
  idempotencyKey?: string;
  replyTo?: string;
}

export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada en el servidor.");
  }

  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Plantilla '${templateName}' no encontrada.`);
  }

  const recipient = template.to || to;
  if (!recipient) {
    throw new Error("El destinatario de correo es obligatorio.");
  }

  const templateData = options.templateData ?? {};
  const element = React.createElement(template.component, templateData);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject =
    typeof template.subject === "function"
      ? template.subject(templateData)
      : template.subject;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.idempotencyKey ? { "Idempotency-Key": options.idempotencyKey } : {})
    },
    body: JSON.stringify({
      from: `${SITE_NAME} <${FROM_ADDRESS}>`,
      to: [recipient],
      subject,
      html,
      text,
      ...(options.replyTo ? { reply_to: options.replyTo } : {})
    })
  });

  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(`Error enviando correo (${response.status}): ${detalle}`);
  }

  return { sent: true };
}