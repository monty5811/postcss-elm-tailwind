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
    Html.div [ TW.tw_h_screen, TW.tw_w_screen, TW.tw_flex, TW.tw_justify_center, TW.tw_items_center, TW.tw_bg_gray_200 ]
        [ Html.div []
            [ Html.button
                [ E.onClick Decrement
                , TW.tw_rounded
                , TW.tw_px_2
                , TW.tw_px_4
                , TW.tw_text_white
                , TW.tw_bg_blue_500
                , TW.tw_w_full
                , TW.hover_tw_bg_blue_700
                , TW.lg_tw_bg_green_500
                , TW.lg_hover_tw_bg_green_700
                , TW.hover_tw_font_bold
                ]
                [ Html.text "-" ]
            , Html.div
                [ TW.tw_text_2xl
                , TW.tw_text_center
                , TW.tw_my_4
                ]
                [ Html.text (String.fromInt model) ]
            , Html.button
                [ E.onClick Increment
                , TW.tw_rounded
                , TW.tw_px_2
                , TW.tw_px_4
                , TW.tw_text_white
                , TW.tw_bg_blue_500
                , TW.tw_w_full
                , TW.hover_tw_bg_blue_700
                , TW.lg_tw_bg_green_500
                , TW.lg_hover_tw_bg_green_700
                , TW.hover_tw_font_bold
                ]
                [ Html.text "+" ]
            ]
        ]
