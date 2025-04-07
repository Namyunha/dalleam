import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // ...
    const imageRule = config.module?.rules?.find((rule) => {
      // 웹팩에 설정된 각 룰들을 돌며 svg관련 규칙을 찾아내 imageRule 변수에 넣어줄 것이다.
      const test = (rule as { test: RegExp }).test;
      // rule.test를 확인할건데, rule.test는 정규표현식 타입이기에 as {test:RegExp}를 써준다.

      if (!test) return false;
      // 만약 rule.test가 존재하지 않는다면 false 반환

      return test.test('.svg');
      // test 메서드는 RegExp.prototype.test()로, 문자열과 졍규표현식이 매치하는지 확인하는 메서드이다.
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg$/;
    // 찾아낸 이미지 규칙을 .svg 확장자를 제외하도록 하는 코드이다. 밑에서 직접 다시 지정해주기 위함이다.

    // 웹팩 설정을 우리 프로젝트에서 '@svgr/webpack' 를 지정했던 것 처럼 새 규칙을 만들어 push 해준다.
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
export default config;
