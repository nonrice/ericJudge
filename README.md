# EricJudge

This is a very simple online judge I made. Only C++17 supported right now. Try it here: [ericjudge.nonrice.repl.co/](ericjudge.nonrice.repl.co/)

### How to use:
1. Read the problem statement from the problemset
2. Paste or type your code into the submit code section
3. Type the appropriate problem ID into the submission ID section
4. Press submit and wait for a response

### Details:
- CPE, MLE, TLE, RTE verdicts are all implemented
- Modular problem system
- VIM MODE TOGGLE

### Problem directory structure
```
PROBLEM_ID
├── input
│   ├── 1.txt
│   ├── 2.txt
│   ├── ...
├── judging_info.json
├── solution.cpp
└── statement.txt
```
- `PROBLEM_ID`: ID to be used in the submission system
- `input`: Testcases must follow the naming convention `1.txt, 2.txt, ...`
- `judging_info.json`: judging criteria (see below)
- `solution.cpp`: model solution
- `statement.txt`: problem statement

#### Format for `judging_info.json`:
```
{
    "tl": 1,
    "ml": 256000,
    "tcs": 5
}
```
- `"tl"` time limit in seconds
- `"ml"` memory limit in kilobytes
- `"tcs"` number of test cases present in `input`
