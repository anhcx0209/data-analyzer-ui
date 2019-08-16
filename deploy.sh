#!/bin/bash

ng build --prod

tar -czvf dist.tar.gz dist

scp ./dist.tar.gz anhcx@data-analyzer-lab:./ 

ssh anhcx@data-analyzer-lab "tar xzf ./dist.tar.gz"

echo "Deploy successful!"
