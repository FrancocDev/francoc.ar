import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "",
            publicFolder: "public",
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            {
                name: "post",
                label: "Posts",
                path: "content/posts",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
            },
            {
                name: "projects",
                label: "Projects",
                path: "content/projects",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                    {
                        type: "string",
                        name: "website",
                        label: "Website",
                    },
                    {
                        type: "string",
                        name: "github",
                        label: "GitHub",
                    },
                    {
                        type: "image",
                        name: "image",
                        label: "Image",
                        required: true,
                    },
                    {
                        type: "object",
                        label: "Technologies",
                        name: "technologies",
                        list: true,
                        required: true,
                        ui: {
                            itemProps: (item) => {
                                return { label: item?.technology };
                            },
                        },
                        fields: [
                            {
                                name: "technology",
                                type: "reference",
                                collections: ["technologies"],
                                required: true,
                            },
                        ],
                    },
                ],
            },
            {
                name: "technologies",
                label: "Technologies",
                path: "content/technologies",
                fields: [
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "keywords",
                        label: "Keywords",
                        list: true,
                    },
                    {
                        type: "image",
                        name: "icon",
                        label: "Icon",
                        required: true,
                    },
                ],
            },
        ],
        // ui: {
        //     // This is an DEMO router. You can remove this to fit your site
        //     // router: ({ document }: { document: any }) => `/demo/blog/${document._sys.filename}`,
        // },
    },
});
