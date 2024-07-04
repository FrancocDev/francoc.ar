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
    search: {
        tina: {
            indexerToken: process.env.TINA_SEARCH_TOKEN,
            stopwordLanguages: ["eng", "spa"],
        },
        indexBatchSize: 100,
        maxSearchIndexFieldLength: 100,
    },
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
                    { type: "boolean", name: "featured", label: "Featured" },
                    { type: "boolean", name: "published", label: "Published" },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date",
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
            {
                name: "socialNetworks",
                label: "Social Networks",
                path: "content/socialNetworks",
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
                        name: "url",
                        label: "URL",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "icon",
                        label: "Icon",
                        required: true,
                    },
                ],
            },
            {
                name: "certificates",
                label: "Certificates",
                path: "content/certificates",
                fields: [
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "issuer",
                        label: "Issuer",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "url",
                        label: "URL",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "image",
                        label: "Image",
                        required: true,
                    },
                ],
            },
            {
                name: "languages",
                label: "Languages",
                path: "content/languages",
                fields: [
                    {
                        type: "string",
                        name: "language",
                        label: "Language",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "fluency",
                        label: "Fluency",
                        required: true,
                    },
                ],
            },
            {
                name: "education",
                label: "Education",
                path: "content/education",
                fields: [
                    {
                        type: "string",
                        name: "institution",
                        label: "Institution",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "url",
                        label: "URL",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "area",
                        label: "Area",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "studyType",
                        label: "Study Type",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "startDate",
                        label: "Start Date",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "endDate",
                        label: "End Date",
                    },
                    {
                        type: "string",
                        name: "score",
                        label: "Score",
                    },
                    {
                        type: "object",
                        label: "Courses",
                        name: "courses",
                        list: true,
                        ui: {
                            itemProps: (item) => {
                                return { label: item?.name };
                            },
                        },
                        fields: [
                            {
                                name: "name",
                                type: "string",
                                required: true,
                            },
                        ],
                    },
                ],
            },
            {
                name: "sections",
                label: "Page Sections",
                path: "content/sections",
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
                        name: "subtitle",
                        label: "Subtitle",
                    },
                    {
                        type: "rich-text",
                        name: "description",
                        label: "Description",
                    },
                    {
                        type: "image",
                        name: "image",
                        label: "Image",
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
