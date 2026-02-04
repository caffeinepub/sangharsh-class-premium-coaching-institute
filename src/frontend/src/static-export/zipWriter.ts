// Simple ZIP file writer for static export
// This creates a ZIP structure in memory that can be written to disk

interface ZipFile {
  path: string;
  content: string | Uint8Array;
}

export class ZipWriter {
  private files: ZipFile[] = [];

  addFile(path: string, content: string | Uint8Array): void {
    this.files.push({ path, content });
  }

  async generate(): Promise<Uint8Array> {
    // This is a placeholder - in the actual build process,
    // we'll use Node.js 'archiver' or similar library
    // For now, we just track the files to be included
    console.log('ZIP would contain:', this.files.map(f => f.path));
    return new Uint8Array(0);
  }

  getFiles(): ZipFile[] {
    return this.files;
  }
}
