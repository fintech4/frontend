import { css } from "styled-components";

const sizes = {
    mobile: 768,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (first, ...interpolations) => css`
            ${
                `@media (max-width: ${value - 1}px) {
                    ${css(first, ...interpolations)}
                }`
            }
        `,
    };
}, {});

export { media, sizes };
