#!/usr/bin/bash

# rsync -rmv --include='*/' \
#  --include='*.excalidraw'\
#  --include='*.jpg'\
#  --include='*.png'\
#  --include='*.png'\
#  --exclude='*' content/ public/content

rsync -rmv --include='*/' \
 --include='*.excalidraw'\
 --include='*.jpg'\
 --include='*.png'\
 --include='*.gif'\
 --include='*.webm'\
 --exclude='*'\
 content/blog/ public/content/blog
