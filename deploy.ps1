yarn; yarn build
Compress-Archive -Path .\dist\* -DestinationPath dist.zip -Force
git archive -o dist_src.zip HEAD