# IKEA Availability Checker
After checking IKEA's website for nearly 3 months trying to order an item (must be in stock to order for delivery), this program was created to automate the process. Every 15 minutes, IKEA's API is queried using the product ID and store numbers of the stores nearby that can ship to me. A notification then shows the results of the query.

Example Notification:

![Example Notification 1](/images/notification1.png)

Example Notification - using two stores that have stock:

![Example Notification 2](/images/notification2.png)