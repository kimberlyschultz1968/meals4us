#!/usr/bin/env python3
"""Meals4Us local dev server — same as `python -m http.server` but tells the
browser never to cache anything. Without this, edited files can keep showing
old content after a normal refresh because the browser's disk cache (not
anything the page's own JS controls) serves a stale copy instead of
re-fetching. A hard refresh works around it once; this fixes it for good."""
import http.server
import os
import sys

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8738

# Always serve this script's own folder, no matter what directory it's launched from.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    http.server.test(HandlerClass=NoCacheHandler, port=port)
