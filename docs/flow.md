[![](https://mermaid.ink/img/pako:eNqNU9tO5DAM_RUrT63EDO8DQqKd4bJixWqGlZAahDKth-nSJt0kZRch_h0nvUzDA-Kprn18bB87byxXBbIFe9Ki2cPN-oRLgLQqUdoo6r5x7Hxr_Nuisdnl6g6ORVMetwa1efAh1VrU2ep_o9GY_tdHUiWtVlVFUc56BrgSsiDP6VafRQdAzJlP2aB-KXN8PM96C84DfzL6k8Cfjv60awobZUqr9CtRHX56tmXyuEZRZdEycX3ciW2FcB8PsQvxjFnE2TKBaEc2NediB21gNoOfFDCg-6lms7NBo4lcDjfoslP_hC7GDFfXKrB7hFrYfF_KJ9Beuo7Lmwd5HdMGpc83jZIGPaxrJ4SRqC-o7Vh4aFFt_2Du6wIV_nX74xZoFdAIwpBj3-2lox33Eq7R0a_RtlpO-vBMYc9hxm9DQjnAuNzPmHmHmU8wyTcwaXAxQanp_j_fQzeFF8VAIazwGf1NTM5jOu0I-5p4DpxF1ztoZWnBUoHY6R0U48zP0J8ZO2I16lqUBb3CN0fIGd1EjZwtyCyEfuaMy3fCtQ2l46pwxdhiJyqDR0y0Vm1eZc4WVrc4gJaloBdd96j3DyWoUjw)](https://mermaid.live/edit#pako:eNqNU9tO5DAM_RUrT63EDO8DQqKd4bJixWqGlZAahDKth-nSJt0kZRch_h0nvUzDA-Kprn18bB87byxXBbIFe9Ki2cPN-oRLgLQqUdoo6r5x7Hxr_Nuisdnl6g6ORVMetwa1efAh1VrU2ep_o9GY_tdHUiWtVlVFUc56BrgSsiDP6VafRQdAzJlP2aB-KXN8PM96C84DfzL6k8Cfjv60awobZUqr9CtRHX56tmXyuEZRZdEycX3ciW2FcB8PsQvxjFnE2TKBaEc2NediB21gNoOfFDCg-6lms7NBo4lcDjfoslP_hC7GDFfXKrB7hFrYfF_KJ9Beuo7Lmwd5HdMGpc83jZIGPaxrJ4SRqC-o7Vh4aFFt_2Du6wIV_nX74xZoFdAIwpBj3-2lox33Eq7R0a_RtlpO-vBMYc9hxm9DQjnAuNzPmHmHmU8wyTcwaXAxQanp_j_fQzeFF8VAIazwGf1NTM5jOu0I-5p4DpxF1ztoZWnBUoHY6R0U48zP0J8ZO2I16lqUBb3CN0fIGd1EjZwtyCyEfuaMy3fCtQ2l46pwxdhiJyqDR0y0Vm1eZc4WVrc4gJaloBdd96j3DyWoUjw)

```mermaid
graph LR;
  Client((Client))
  Request[GET /api/users]
  Router[Express Router]
  Controller["Request Handler<br>(Controller)"]
  Service_A[Service A]
  Service_B[Service B]
  Service_C[Service C]
  Repository_A[Repository A]
  DB_Real[(DB<br>Table X)]
  DB_Fake[("DB (fake)")]

  Client -- Makes request --> Request
  Request -- Express fowards request<br>to the matching router --> Router
  Router -- Sends response --> Client
  Router -- Convert Express request object<br> to POJO and pass to handler --> Controller
  Controller -- Returns response POJO --> Router
  Controller -- Uses --> Service_A
  Controller -. Uses .-> Service_B
  Controller -. Uses .-> Service_C
  Service_A -- Uses --> Repository_A
  Repository_A -- Requests data --> DB_Real
  DB_Real -- Returns data --> Repository_A
  Repository_A -. "(If unit test)<br>Requests data" .-> DB_Fake
```
