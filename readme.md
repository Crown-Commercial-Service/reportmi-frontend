# Report management information frontend

Frontend components for the [Report management information sevice](https://www.reportmi.crowncommercial.gov.uk/) at the Crown
Commercial Service.

Extends the [GOVUK-Frontend](https://github.com/alphagov/govuk-design-system) components.

## Goals
- Maintain the GOVUK-Frontend module as a dependacy.
- Styles only, markup is to show usage
- Simple to add to Rails applications

## Install

Clone the repo, move in to the directory and run:

```npm install```

## Development

Launch the [Fractal](https://fractal.build/) UI and run watch tasks.

```npm start```

We follow the GOVUK css coding standards, run the linter:

```npm run lint```

https://github.com/alphagov/govuk-frontend/blob/master/docs/contributing/coding-standards/css.md

Where a component is extended we keep the *govuk* namespace:

```govuk-button```

Where a new component is added, we use the *ccs* namespace:

```ccs-pagination```

## Build
Run the build process to to create static site in the *docs* directory, this is so we can publish to
Github Pages.

```npm run build```

## In Rails
- Add the dependacy on GOVUK-Frontend in your Rails app

  ```yarn add govuk-frontend```

- Copy the contents of the *stylesheets* directory to *app/assets/stylesheets* in your Rails app

- Copy the contents of the *images* directory to *app/assets/images* in your Rails app

- Require *reportmi.scss* in the manifest

  ```*= require reportmi```

- config the *config/initalizers/assets.rb* to locate the GOVUK-Frontend assets and precompile them

  ```Rails.application.config.assets.paths << Rails.root.join('node_modules/govuk-frontend/assets/images')```

  ```Rails.application.config.assets.precompile += %w( govuk-frontend/assets/images/* )```

- configure the *$govuk-image-url-function* to use the *image-url* helper function in *_settings.scss*

  ```$govuk-image-url-function: 'image-url';```

