export function onDragStart(event, data, source = null, callback = null) {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData("application/json", JSON.stringify(data));
  if (source) event.dataTransfer?.setData("source", source);
  if (callback) callback();
}

export function onDragEnd(event, canvas, callback = null) {
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const insideCanvas =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (callback) callback({ insideCanvas });
}

export function onDrop(event, callback) {
  const raw = event.dataTransfer?.getData("application/json");
  const source = event.dataTransfer?.getData("source");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    callback(data, source);
  } catch (err) {
    console.error("Invalid drag data", err);
  }
}
