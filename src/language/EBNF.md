# TOC

JQL stands for Jira Query Language, which is an SQL like syntax.
For concrete examples please see test files.

## EBNF

```
S :== ^ expression [ orderByClause ] $
expression(Or,And) :== term [ separator(Or,And) { paren{expression} | expression } ]
term :== ^ operand [ {space} operator { operand } ]
operand :== ^ [space] (quote | string | paren{list})
list :== operand [ {Comma} {list} ]
paren :==  ^ "(" {...} ")"
orderByClause :== ^ [space] "ORDER BY" operand " ASC|DESC" $
space :== " "
```

http://www.cs.man.ac.uk/~pjj/farrell/comp2.html

Extended with some rules

* `^` and `$` stands for string start and end for strict error check
* `x | Or,And,Comma` => x in precedence order
* `space :== [space]` => eating up arbitrary amount of spaces
