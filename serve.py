from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class ReviewerHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


site_root = Path(__file__).resolve().parent / "dist"
handler = lambda *args, **kwargs: ReviewerHandler(*args, directory=str(site_root), **kwargs)
server = ThreadingHTTPServer(("0.0.0.0", 6788), handler)
print("Reviewer available at http://127.0.0.1:6788", flush=True)
server.serve_forever()
