let clipboardContent = '';

const Clipboard = {
  setString(text: string) {
    clipboardContent = String(text);
  },

  async getString(): Promise<string> {
    return clipboardContent;
  },

  async hasString(): Promise<boolean> {
    return clipboardContent.length > 0;
  },
};

export default Clipboard;
