# postcss-elm-tailwind

[tailwind](https://tailwindcss.com) + [elm](http://elm-lang.org) = :rocket:

See the [demo](https://postcss-elm-tailwind-demo.onrender.com/) and [repo](https://github.com/monty5811/postcss-elm-tailwind/tree/master/demo).

[![Actions Status](https://github.com/monty5811/postcss-elm-tailwind/workflows/Node%20CI/badge.svg)](https://github.com/monty5811/postcss-elm-tailwind/actions)

```elm
view : Model -> Html Msg
view model =
    Html.div [ TW.h_screen, TW.w_screen, TW.flex, TW.justify_center, TW.items_center, TW.bg_gray_200 ]
        [ Html.div []
            [ Html.button
                [ E.onClick Decrement
                , TW.px_2
                , TW.px_4
                , TW.text_white
                , TW.bg_blue_500
                , TW.w_full
                ]
                [ Html.text "-" ]
            , Html.div
                [ TW.text_2xl
                , TW.text_center
                , TW.my_4
                ]
                [ Html.text (String.fromInt model) ]
            , Html.button
                [ E.onClick Increment
                , TW.px_2
                , TW.px_4
                , TW.text_white
                , TW.bg_blue_500
                , TW.w_full
                ]
                [ Html.text "+" ]
            ]
        ]
```

## Installation

```
yarn add postcss-elm-tailwind --dev

# OR

npm i -D postcss-elm-tailwind
```

## Usage

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-elm-tailwind")({
      tailwindConfig: "./tailwind.config.js", // tell us where your tailwind.config.js lives
      // only the tailwindConfig key is required, the rest are optional:
      elmFile: "src/Tailwind.elm", // change where the generated Elm module is saved
      elmModuleName: "Tailwind", // this must match the file name or Elm will complain
      nameStyle: "snake", // "snake" for snake case, "camel" for camel case
      splitByScreens: true // generate an Elm module for each screen
    })
  ]
};
```

See the [demo](https://github.com/monty5811/postcss-elm-tailwind/tree/master/demo) for a full example.

### Other output formats

#### SVG

If you want to use Tailwind classes to style `SVG` you can output an `Svg` module like this:

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-elm-tailwind")({
      tailwindConfig: "./tailwind.config.js",
      elmFile: "src/Tailwind.elm",
      elmModuleName: "Tailwind",
      formats: {
        svg: {
          elmFile: "src/Tailwind/Svg.elm",
          elmModuleName: "Tailwind.Svg"
        }
      }
    })
  ]
};
```

#### String

If you want access to the class names themselves, you can output a `String` module as an escape hatch:

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-elm-tailwind")({
      tailwindConfig: "./tailwind.config.js",
      elmFile: "src/Tailwind.elm",
      elmModuleName: "Tailwind",
      formats: {
        string: {
          elmFile: "src/Tailwind/String.elm",
          elmModuleName: "Tailwind.String"
        }
      }
    })
  ]
};
```

## Other things to note

In order to get a small build, you'll need to build Tailwind twice - once
without purgecss to build `TW.elm` with all the classes and once with purgecss
so that all the unused classes are removed from your production CSS.
See how this is implemented in the [demo](https://github.com/monty5811/postcss-elm-tailwind/blob/master/demo/package.json#L22).
