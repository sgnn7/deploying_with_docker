# Deployment with Docker

This repository contains all the code that is used in [the book](https://www.amazon.com/Deployment-Docker-continuous-integration-applications-ebook/dp/B075V97CCD).

# Troubleshooting

Most problems with the code are due to the speed of development for the dependencies of NodeJS and
they are listed here with solutions.

## `TypeError: 'connect' only accepts a callback`

`mongodb` package was released with a new version that breaks backwards compatibility. The exact fix is [here](https://github.com/sgnn7/deploying_with_docker/commit/1deb5407fc462a03d587b29250386aad68169b1e)
and is already available on the master branch of this repository.

## `body-parser deprecated undefined extended`

This is another issue with the `mongodb` package changes that occured after the book was printed.
Fix for this issue is [here](https://github.com/sgnn7/deploying_with_docker/commit/d43114ed4804f651dbbcda72ee5ad397520bb864) and the fix has also already been applied to the master branch of this repository.
