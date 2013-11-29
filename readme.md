# Node Package Generator

Generate npm modules from a template.

Example
```
npg MyProject $HOME
``` 

This will generate the following file structure in your home directory
```
MyProject
-- lib
  -- MyProject.js
-- test
  -- MyProject_tests.js
-- package.json
```

There are also several flags you can provide

* ```-h``` display help
* ```-v``` show version
* ```-a``` author, comma seperated "name,email,url"
* ```-d``` dependencies, comma seperated "packageA:0.2.3,packageB:1.0.0"
* ```-D``` module description
* ```-l``` module license, MIT or BSD
* ```-k``` keywords, comma seperated
* ```-dd``` dev dependencies, listed the same as regular dependencies
* ```-f``` force generate, will overwrite/delete existing folder


example

```
npg -a "Daniel Mills,mills.dma@gmail.com,http://danielmills.me" -d "request:*" -D "My new awesome module" SomeModule $HOME/projects
```
