module Main exposing (main)

import Browser exposing (sandbox)
import Html exposing (Html)
import Html.Events as E
import TW



-- MAIN


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    Int


init : Model
init =
    0



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


view : Model -> Html Msg
view model =
    Html.div [ TW.h_screen, TW.w_screen, TW.flex, TW.justify_center, TW.items_center, TW.bg_gray_200 ]
        [ Html.div []
            [ Html.button
                [ E.onClick Decrement
                , TW.rounded
                , TW.px_2
                , TW.px_4
                , TW.text_white
                , TW.bg_blue_500
                , TW.w_full
                , TW.hover_bg_blue_700
                , TW.lg_bg_green_500
                , TW.lg_hover_bg_green_700
                , TW.hover_font_bold
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
                , TW.rounded
                , TW.px_2
                , TW.px_4
                , TW.text_white
                , TW.bg_blue_500
                , TW.w_full
                , TW.hover_bg_blue_700
                , TW.lg_bg_green_500
                , TW.lg_hover_bg_green_700
                , TW.hover_font_bold
                ]
                [ Html.text "+" ]
            ]
        ]
