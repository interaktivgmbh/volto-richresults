import { registerArticleRichResultType } from './types/Article';
import { registerOrganizationRichResultType } from './types/Organization';
import { registerPersonRichResultType } from './types/Person';
import { registerJobPostingRichResultType } from './types/JobPosting';
import { registerDatasetRichResultType } from './types/Dataset';
import { registerEventRichResultType } from './types/Event';
import { registerFAQPageRichResultType } from './types/FAQPage';
import { registerResearchProjectRichResultType } from './types/ResearchProject';
import { registerHowToRichResultType } from './types/HowTo';
import { registerWebPageRichResultType } from './types/WebPage';
import { registerNewsArticleRichResultType } from './types/NewsArticle';
import RichResultsWidget from './components/RichResultsWidget';
import RichResultsConfigWidget from './components/RichResultsConfigWidget';
import LimitedRichtextWidget from './components/LimitedRichtextWidget';
import ImageUrlWidget from './components/ImageUrlWidget';
import RichResultsAppExtra from './components/RichResultsAppExtra';
import RichResultsBlock from './blocks/RichResultsBlock';
import reducers from './reducers';

/**
 * Volto Rich Results Addon
 *
 * Provides a custom widget for managing Rich Results (schema.org structured data)
 * in Volto content edit forms and automatically renders JSON-LD in page <head>.
 * Also provides a block for editing Rich Results directly in content.
 */
const applyConfig = (config: any) => {
  // Register Rich Result types (Article, BreadcrumbList, Event, etc.)
  config = registerArticleRichResultType(config);
  config = registerOrganizationRichResultType(config);
  config = registerPersonRichResultType(config);
  config = registerJobPostingRichResultType(config);
  config = registerDatasetRichResultType(config);
  config = registerEventRichResultType(config);
  config = registerFAQPageRichResultType(config);
  config = registerResearchProjectRichResultType(config);
  config = registerHowToRichResultType(config);
  config = registerWebPageRichResultType(config);
  config = registerNewsArticleRichResultType(config);

  // Register custom widget for the richresults field
  config.widgets.id = {
    ...config.widgets.id,
    richresults: RichResultsWidget,
  };

  // Register custom widget for limited_richtext
  config.widgets.widget = {
    ...config.widgets.widget,
    limited_richtext: LimitedRichtextWidget,
    image_url: ImageUrlWidget,
  };

  // Add Rich Results component to appExtras to render JSON-LD on every page
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: RichResultsAppExtra,
    },
  ];

  // Register Rich Results block
  config.blocks.blocksConfig.richResultsBlock = RichResultsBlock;

  // Register custom widget for the richresults Settings
  config.widgets.id = {
    ...config.widgets.id,
    richresults_config: RichResultsConfigWidget,
  };

  // Register reducer for Rich Results config
  config.addonReducers = {
    ...config.addonReducers,
    ...reducers,
  };

  return config;
};

export default applyConfig;
