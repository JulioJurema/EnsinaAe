import React from "react";

// Escapa HTML do usuário antes de injetar tags
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Pré-processa seu "markdown" customizado
export const parseCustomMarkdown = (text: string) => {
  if (!text) return "";

  // 1) Escapa tudo
  let out = escapeHtml(text);

  // 2) Substituições (ordem importa!)
  // Imagem: [https://link.com/img.png]
  out = out.replace(
    /\[(https?:\/\/[^\s\]]+)\]/g,
    "<img src='$1' class='max-w-[300px]' />"
  );

  // Referência em SUB: ^^texto^^
  out = out.replace(
    /\^\^([\s\S]+?)\^\^/g,
    "<sub class='font-[200] text-[0.9em]'>$1</sub>"
  );

  // Negrito: **texto**
  out = out.replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>");

  // Itálico por __texto__
  out = out.replace(/__([\s\S]+?)__/g, "<em>$1</em>");

  // Itálico por *texto* (bold já foi processado)
  out = out.replace(/\*([\s\S]+?)\*/g, "<em>$1</em>");

  // Sublinhado: ~~texto~~
  out = out.replace(/~~([\s\S]+?)~~/g, "<u>$1</u>");

  return out;
};

interface RenderMarkdownProps {
  text: string;
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ text }) => (
  <div
    className="mb-[2em] whitespace-pre-wrap"
    dangerouslySetInnerHTML={{ __html: parseCustomMarkdown(text) }}
  />
);

export default RenderMarkdown;
