module Main exposing (main)

import Browser exposing (sandbox)
import Html exposing (Html)
import Html.Attributes as A
import Html.Events as E
import TLWND as TW



-- MAIN


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    { current : Int
    , history : List Int
    }


init : Model
init =
    { current = 0
    , history = []
    }



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            updateModel (model.current + 1) model

        Decrement ->
            updateModel (model.current - 1) model


updateModel : Int -> Model -> Model
updateModel newVal model =
    { model | current = newVal, history = newVal :: model.history }



-- VIEW


view : Model -> Html Msg
view model =
    Html.div
        [ TW.tw_text_gray_900
        , TW.tw_max_w_3xl
        , TW.tw_w_full
        , TW.tw_mx_auto
        , TW.tw_px_6
        , TW.tw_py_12
        ]
        [ Html.h1
            [ TW.tw_text_2xl
            , TW.tw_font_normal
            , TW.tw_mb_2
            ]
            [ Html.text "Demo: postcss-elm-tailwind"
            ]
        , Html.div [ TW.tw_text_gray_700 ]
            [ Html.a
                [ A.href "https://github.com/monty5811/postcss-elm-tailwind"
                , TW.hover__tw_underline
                ]
                [ Html.text "github" ]
            , Html.span [] [ Html.text " | " ]
            , Html.a
                [ A.href "https://github.com/monty5811/postcss-elm-tailwind/tree/master/demo"
                , TW.hover__tw_underline
                ]
                [ Html.text "source" ]
            ]
        , Html.hr [ TW.tw_my_8 ] []
        , Html.div []
            [ Html.h2
                [ TW.tw_text_xl
                , TW.tw_font_normal
                , TW.tw_mb_4
                ]
                [ Html.text "Form" ]
            , Html.label [ TW.tw_block ]
                [ Html.span [ TW.tw_text_gray_700 ] [ Html.text "Name" ]
                , Html.input
                    [ TW.tw_form_input, TW.tw_mt_1, TW.tw_block, TW.tw_w_full, A.placeholder "Jane Doe" ]
                    []
                ]
            , Html.div [ TW.tw_mt_4 ]
                [ Html.span [ TW.tw_text_gray_700 ] [ Html.text "Account Type" ]
                , Html.div [ TW.tw_mt_2 ]
                    [ Html.label [ TW.tw_inline_flex, TW.tw_items_center ]
                        [ Html.input [ A.type_ "radio", TW.tw_form_radio, A.name "accountType", A.value "personal" ] []
                        , Html.span [ TW.tw_ml_2 ] [ Html.text "Personal" ]
                        ]
                    , Html.label [ TW.tw_inline_flex, TW.tw_items_center, TW.tw_ml_6 ]
                        [ Html.input [ A.type_ "radio", TW.tw_form_radio, A.name "accountType", A.value "business" ] []
                        , Html.span [ TW.tw_ml_2 ] [ Html.text "Business" ]
                        ]
                    ]
                ]
            , Html.label [ TW.tw_block, TW.tw_mt_4 ]
                [ Html.span [ TW.tw_text_gray_700 ] [ Html.text "Requested Limit" ]
                , Html.select [ TW.tw_form_select, TW.tw_mt_1, TW.tw_block, TW.tw_w_full ]
                    [ Html.option [] [ Html.text "$1,000" ]
                    , Html.option [] [ Html.text "$5,000" ]
                    , Html.option [] [ Html.text "$10,000" ]
                    , Html.option [] [ Html.text "$25,000" ]
                    ]
                ]
            , Html.div [ TW.tw_flex, TW.tw_mt_6 ]
                [ Html.label [ TW.tw_flex, TW.tw_items_center ]
                    [ Html.input [ A.type_ "checkbox", TW.tw_form_checkbox ] []
                    , Html.span [ TW.tw_ml_2 ]
                        [ Html.text "I agree to the "
                        , Html.span [ TW.tw_underline ] [ Html.text "privacy policy" ]
                        ]
                    ]
                ]
            ]
        , Html.hr [ TW.tw_my_8 ] []
        , Html.div []
            [ Html.h2
                [ TW.tw_text_xl
                , TW.tw_font_normal
                , TW.tw_mb_4
                ]
                [ Html.text "Counter" ]
            , Html.button
                (E.onClick Decrement :: buttonCls)
                [ Html.i
                    [ TW.fa
                    , TW.fa_minus
                    ]
                    []
                ]
            , Html.div
                (TW.classList
                    -- make sure classList works ok
                    [ ( TW.tw_text_2xl, True )
                    , ( TW.tw_text_center, True )
                    , ( TW.tw_my_4, True )
                    , ( TW.tw_text_red_500, model.current > 5 )
                    ]
                )
                [ Html.text (String.fromInt model.current) ]
            , Html.button
                (E.onClick Increment :: buttonCls)
                [ Html.i
                    [ TW.fa
                    , TW.fa_plus
                    ]
                    []
                ]
            ]
        , Html.div []
            [ Html.h2
                [ TW.tw_text_xl
                , TW.tw_font_normal
                , TW.tw_mb_4
                , TW.test_dot_with_dot_a_dot_dot -- here to test classes with a "." in them
                ]
                [ Html.text "Counter History" ]
            , Html.div
                []
              <|
                List.map historyEntry (List.reverse model.history)
            ]
        ]


historyEntry : Int -> Html msg
historyEntry val =
    Html.div
        [ TW.first__tw_bg_indigo_100
        , TW.even__tw_bg_indigo_200
        , TW.odd__tw_bg_indigo_300
        , TW.last__tw_bg_indigo_400
        , TW.tw_max_w_xs
        , TW.tw_text_center
        ]
        [ Html.text <| String.fromInt val ]


buttonCls : List (Html.Attribute msg)
buttonCls =
    [ TW.tw_rounded
    , TW.tw_py_2
    , TW.tw_px_4
    , TW.tw_text_white
    , TW.tw_text_lg
    , TW.tw_bg_blue_500
    , TW.hover__tw_bg_blue_700
    , TW.lg__tw_bg_green_500
    , TW.lg__hover__tw_bg_green_700
    , TW.hover__tw_font_bold
    , TW.tw_mx_auto
    , TW.tw_block
    , TW.tw_w_1over4
    , TW.tw_transition
    , TW.tw_duration_500
    , TW.tw_ease_in_out
    , TW.tw_transform
    , TW.hover__tw_neg_translate_y_1
    , TW.hover__tw_scale_110
    ]
