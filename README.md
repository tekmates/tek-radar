# Tek-radar


**Tek-radar** *(technology radar)* is a powerful tool designed to guide our engineering teams in selecting the most suitable technologies for new projects. It serves as a platform for sharing knowledge and experiences, facilitating informed technology decisions, and continuously evolving our technology landscape.

This repository contains sources of our techradar, which is located under [radar.tekmates.pro](https://radar.tekmates.pro). Feel free to use our approach as a foundation for building your own radar.

## Contributing

We appreciate contributions to the source code of this project. However, please note that adding new entries to the radar is only permitted if you are a staff member of our team.

### Adding a new entry

To add a new entry to the radar:

1. Add a CSV file named after the radar's date in the format **dd-MM-YYYY**.
2. Place the file in the `radars` folder, within the subfolder corresponding to your field (e.g., iOS, Android, backend). If a subfolder for your field doesn't exist, create one.
3. After making these changes, open a Pull Request (PR) for review.

You could also tweak settings that will be applied on radars in your field. Create settings.json file inside your subfolder and modify the fields you want. Here is a template of `settings.json` file:

```json
{
    "title": "your title here",
    "rings": {
        "adopt": { "name": "ADOPT", "color": "#5ba300" },
        "trial": { "name": "TRIAL", "color": "#009eb0" },
        "assess": { "name": "ASSESS", "color": "#c7ba00" },
        "hold": { "name": "HOLD", "color": "#e09b96" }
    },
    "quadrants": {
        "names": {
            "q1": "Data Management",
            "q2": "Frameworks & Tools",
            "q3": "Languages & Techniques",
            "q4": "Platforms & Infrastructure"
        },
        "aliases": {
            "Data Management": "q1",
            "data": "q1",
            "Frameworks & Tools": "q2",
            "frameworks": "q2",
            "tools": "q2",
            "Languages & Techniques": "q3",
            "languages": "q3",
            "techniques": "q3",
            "Platforms & Infrastructure": "q4",
            "platform": "q4",
            "platforms": "q4",
            "infra": "q4",
            "infrastructure": "q4"
        }
    }
}
```

### Development

To make changes to the source code:

1. Install the necessary dependencies by running the following command: `npm i`
3. Begin updating the code as needed.
4. To check your changes, use the following command to generate and run the tech radar with the updates: `npm run start`
6. Once you have finished making changes, open a Pull Request (PR) for review.

## Acknowledgements

**Tek-radar** is based on [Zalando's tech radar](https://github.com/zalando/tech-radar) and powered by [Eleventy (11ty)](https://github.com/11ty/eleventy).

## License

**Tek-radar** is under the terms and conditions of the [MIT license](./LICENSE).
