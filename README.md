# Invoicing

## Setup

This project is build using Ruby version 2.5.1. To ensure this version is installed, assuming `rbenv` and `ruby-build` are installed:
```bash
$ rbenv install 2.5.1
```

This project also uses `node` and `yarn`. Assuming an OSX device using HomeBrew:
```bash
$ brew install node
$ brew install yarn
```

For a database, this project uses `sqlite3`. Assuming an OSX device using HomeBrew:
```bash
$ brew install sqlite3
```

You can run
```bash
$ ./bin/setup
```

to install all node and ruby dependencies, as well as setup the initial database.

Running specs can be accomplished with the following command:
```bash
$ bundle exec rspec
```

Starting the Rails server uses:
```bash
$ bundle exec rails s
```

which allows access to the application at `localhost:3000`.

## Requirements Met

* The user should be able browse through the line-item data as either a list or table (ie. pagination or infinite-scrolling).
* The user should be able to edit line-item "adjustments".
* The user should be able to see each line-item's billable amount (sub-total = actuals + adjustments).
* The user should be able to see sub-totals grouped by campaign (line-items grouped by their parent campaign).
* The user should be able to see the invoice grand-total (sum of each line-item's billable amount).
* The user should be able flag individual line-items as "reviewed" (meaning they are disabled from further editing).
* The user should be able flag "campaigns" as being reviewed, as well.
* The user should be able to filter the data (ie. by campaign name, etc., should affect the grand-total).

As I'm applying for a more generalist position, I tried to choose requirements that would allow me to build out React components as well as show some proficiency in Rails (which is actually where I'm strongest). Marking a "campaign" as reviewed proved more problematic than I expected. In trying to complete this project without spending exorbitant amounts of time on a single requirement, I settled on a less-than-optimal state management solution in the LineItemRowController component where it mirrors props in its state. On the Rails side, I opted to use the Oj gem for JSON marshalling so that it would be more performant on the rendering side. I also chose to use a set of Serializers in an effort to keep view logic out of the data models.

Nearing completion, I happened to notice a small bug that I've left in the app as-is. If you mark all the line items of a campaign as reviewed, the "Mark Reviewed" button for the campaign will be present. I had hoped to correct this, but hit a timeboxing limit for myself. If I were to approach that bug, I would almost certainly be reworking state management throughout the application such that a campaign is more the parent of all line items, rather than the line item rows being somewhat independent. I also opted not to spend time on JavaScript tests, though in a real application I would push for those, or at least feature specs in Rails to cover the use cases.