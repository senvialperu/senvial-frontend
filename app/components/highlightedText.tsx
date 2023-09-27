interface HighlightedTextProps {
  text: string;
  tag: string;
  className?: string;
  color?: string;
}

export default function HighlightedText({
  text,
  tag,
  className,
  color,
}: HighlightedTextProps) {
  console.log('text recieved ', text)
  const tempText = text.split(" ");
  let result = [] as string[];

  result.push(`<${tag} class="${className ? className : ""}">`);

  tempText.forEach((word: string, index: number) => {
    if (word.includes("[")) {
      const highlight = word.replace("[", "").replace("]", "");
      result.push(
        `<span key=${index} class="${color ? color : ""}">${highlight}</span> `
      );
    } else result.push(word + " ");
  });

  result.push(`</${tag}>`);

  return <div dangerouslySetInnerHTML={{ __html: result.join("") }} />;
}
