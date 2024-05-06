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
 --exclude='*'\
 content/blog/ public/content/blog
