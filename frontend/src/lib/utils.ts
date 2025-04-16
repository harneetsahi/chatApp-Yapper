export function formatMessageTime(data: string) {
  return new Date(data).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    day: "numeric",
    month: "long",
  });
}
