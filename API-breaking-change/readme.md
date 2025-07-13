

# Handling API Breaking Changes 


Imagine you’re designing and maintaining an internal or public-facing **Weather API**. A basic version of the response looks like:

```
{
  "Weather": [
    { "hour": 0, "temperature": "18", "condition": "Clear" },
    { "hour": 1, "temperature": "17", "condition": "Clear" },
    ...
    { "hour": 23, "temperature": "16", "condition": "Cloudy" }
 ]
}
```

 Assumming this is the first published contract is consumed by multiple frontend apps already we need to introduced a change. please answer to these questions:
 

### 1 What Is a Breaking Change?

Provide examples of what would constitute a **breaking change** to this API response for the frontends that are using tihs endpoints. provide at least 3 example.

> In the case of this implementation the API could be modified in serveral ways that will constitute in a breaking change, IE

>  1.- Changing the measurement unit for the temperature, since this API is not using custom units changing from celsius to farenheit would be considered a breaking change

> 2.- Removing fields, all the fields returned by the API can be use in any weather widget, so removing any without handling the frontend part first will result in a breaking change

> 3.- Structural changes, things like degrees can be set as an external field outside the "hours" so it can be used commonly throught all the response, so structures like 
```
 { result: ...data }
 can be broken by doing
 { forecast: ...data, metadata: ...data }
```

### 2 Coordinating Across Multiple Frontends

You have **multiple frontend clients** some update imidiately and some take their update only every 1–2 months.
**How would you handle an API schema change across all of them safely?**

> The most secure way would be using API versioning, so the first clients or the slowest to update their frontends will keep using a valid version of the API meanwhile the new version is released and sent to clients to update in a certain period of time

### 3 How to Catch Breaking Changes During Development

Describe how a team can **detect breaking changes early**, in your experince. please elaburate.

> Using types (in languages like Typescript) or defining contracts can be a useful way to check for breaking changes, if these contracts are checked using unit or end to end testing then the team will be notified instantly when a change goes outside the expected information from the clients


### 4 Policy for Releasing Changes

What internal **policy/process** was established to manage schema changes safely, in your previous team?

> The most common in my experience has been API versioning, not just using things like v1/v2/v3... but also yearly versioning (2024_01/2024_02/2025_01...) this has been properly maintined using tools like Swagger, so external API clients can always know how to use any version of the system


## 🧪 Acceptance Criteria
- Answer these four questions thoroughly – at least one paragraph each, maximum half a page.
- Provide practical examples from your own experience. Don’t just rely on ChatGPT’s first suggestion — dig deeper!





