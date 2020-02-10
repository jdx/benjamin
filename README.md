# benjamin

![](benjamin.jpg)

Get your bank transactions at the CLI!

First set these env vars:

* `PLAID_CLIENT_ID`
* `PLAID_PUBLIC_KEY`
* `PLAID_SECRET`
* `PLAID_ENV`

Then run `npx benjamin login` and login through the browser.

Then run `npx benjamin transactions` and see your latest transactions!

```sh-session
$ npx benjamin transactions
ts-node src/cli transactions 2019-12-01 2019-12-31
2019-12-30                                  Uber    6.33
2019-12-27                            Tectra Inc  500.00
2019-12-26             AUTOMATIC PAYMENT - THANK 2078.50
2019-12-26                                   KFC  500.00
2019-12-26                  Madison Bicycle Shop  500.00
2019-12-17          CREDIT CARD 3333 PAYMENT *//   25.00
2019-12-17                                  Uber    5.40
2019-12-16 ACH Electronic CreditGUSTO PAY 123456 5850.00
2019-12-16                  CD DEPOSIT .INITIAL. 1000.00
2019-12-15                   Touchstone Climbing   78.50
2019-12-15                       United Airlines -500.00
2019-12-14                            McDonald's   12.00
2019-12-14                             Starbucks    4.33
2019-12-13                              SparkFun   89.40
2019-12-12                          INTRST PYMNT   -4.22
2019-12-02                       United Airlines  500.00
```
