# @interaktiv/volto-richresults

A Volto addon for managing Google Rich Results (structured data / schema.org JSON-LD) in Plone 6.

This addon provides a comprehensive solution for adding and managing structured data on your Plone/Volto site, improving SEO and enabling rich search result features in Google and other search engines.

## Features

- Custom widget for editing Rich Results directly in content
- Schema-driven form editing with validation
- Multiple Rich Result types out of the box
- Automatic default value population from content fields
- JSON-LD output rendered in page `<head>` for SEO
- Control panel for configuring available types per content type
- Google Rich Results Test integration for validation
- REST API endpoint for fetching configuration

## Supported Rich Result Types

| Type | Description |
|------|-------------|
| Article | Blog posts, news stories, articles |
| NewsArticle | News-specific article markup |
| Event | Events with dates, locations, performers |
| FAQPage | Frequently asked questions |
| HowTo | Step-by-step instructions |
| JobPosting | Job listings with salary, requirements |
| Organization | Company/organization information |
| Person | Individual person details |
| WebPage | Generic web page markup |
| Dataset | Scientific/research datasets |
| ResearchProject | Research project information |

## Requirements

- Plone 6.0+
- Volto 18.0+
- Backend addon: `interaktiv.voltorichresults`

## Installation

### Backend Setup

1. Add `interaktiv.voltorichresults` to your backend:

```ini
# requirements.txt or pip
interaktiv.voltorichresults
```

2. Install the addon in your Plone site via the Add-ons control panel

3. The `IRichResults` behavior will be available for your content types

### Frontend Setup

1. Add the package to your Volto project:

```bash
pnpm add @interaktiv/volto-richresults
```

2. Add to your `volto.config.js`:

```javascript
const addons = ['@interaktiv/volto-richresults'];

module.exports = {
  addons,
};
```

3. Add the behavior to content types in the backend (e.g., via GenericSetup):

```xml
<!-- profiles/default/types/Document.xml -->
<property name="behaviors" purge="false">
  <element value="interaktiv.voltorichresults.behaviors.richresults.IRichResults"/>
</property>
```

## Usage

### Editing Rich Results

1. Edit a content item that has the Rich Results behavior
2. Find the "Rich Results" field in the edit form
3. Click "Add Rich Result" and select a type
4. Fill in the form fields (many are pre-populated from content)
5. Save the content

The JSON-LD structured data is automatically rendered in the page `<head>`.

### Control Panel Configuration

Administrators can configure which Rich Result types are available for each content type:

1. Go to Site Setup > Rich Results Settings
2. Add content types and select which Rich Result types should be available
3. Save

### Testing with Google

Each Rich Result entry includes a "Test with Google" button that opens Google's Rich Results Test tool with your structured data pre-filled.

## Configuration

### Registering Custom Rich Result Types

You can register additional Rich Result types in your addon:

```typescript
// In your addon's index.ts
import type { ConfigType } from '@plone/registry';

const applyConfig = (config: ConfigType) => {
  config.settings.richresults = {
    ...config.settings.richresults,
    types: {
      ...config.settings.richresults?.types,
      MyCustomType: {
        id: 'MyCustomType',
        title: 'My Custom Type',
        schema: myCustomSchema,
        getDefaults: (content) => ({
          '@context': 'https://schema.org',
          '@type': 'MyCustomType',
          // ... default values
        }),
        toJsonLd: (formData, content) => ({
          // ... transform form data to JSON-LD
        }),
      },
    },
  };
  return config;
};

export default applyConfig;
```

## Development

### Project Structure

```
src/
├── index.ts                    # Addon configuration
├── registry.ts                 # Rich Result type registry
├── actions/                    # Redux actions
├── reducers/                   # Redux reducers
├── components/
│   ├── RichResultsWidget.tsx   # Main widget component
│   ├── RichResultEditModal.tsx # Edit modal
│   ├── RichResultsHead.tsx     # JSON-LD head renderer
│   ├── RichResultsAppExtra.tsx # App extra component
│   └── ...
├── types/                      # Rich Result type definitions
│   ├── Article.ts
│   ├── Event.ts
│   └── ...
├── blocks/                     # Optional block implementation
└── helpers/                    # Utility functions
```

### Running Tests

```bash
pnpm test
```

### Building

```bash
pnpm build
```

## License

GPL version 2

## Author

[Interaktiv GmbH](https://www.interaktiv.de)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Related

- [interaktiv.voltorichresults](https://github.com/interaktivgmbh/interaktiv.voltorichresults) - Backend addon for Plone
- [Google Rich Results Documentation](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Schema.org](https://schema.org/)
