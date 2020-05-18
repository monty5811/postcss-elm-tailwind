module TLWND.Svg exposing
    ( classList
    , even__tw_bg_indigo_200
    , fa
    , fa_minus
    , fa_plus
    , first__tw_bg_indigo_100
    , hover__tw_bg_blue_700
    , hover__tw_font_bold
    , hover__tw_neg_translate_y_1
    , hover__tw_scale_110
    , hover__tw_underline
    , last__tw_bg_indigo_400
    , lg__hover__tw_bg_green_700
    , lg__tw_bg_green_500
    , odd__tw_bg_indigo_300
    , test_dot_with_dot_a_dot_dot
    , tw_bg_blue_500
    , tw_block
    , tw_container
    , tw_duration_500
    , tw_ease_in_out
    , tw_flex
    , tw_font_normal
    , tw_form_checkbox
    , tw_form_checkbox____neg_ms_check
    , tw_form_checkbox__checked
    , tw_form_input
    , tw_form_multiselect
    , tw_form_radio
    , tw_form_radio____neg_ms_check
    , tw_form_radio__checked
    , tw_form_select
    , tw_form_select____neg_ms_expand
    , tw_form_textarea
    , tw_inline_flex
    , tw_items_center
    , tw_max_w_3xl
    , tw_max_w_xs
    , tw_mb_2
    , tw_mb_4
    , tw_ml_2
    , tw_ml_6
    , tw_mt_1
    , tw_mt_2
    , tw_mt_4
    , tw_mt_6
    , tw_mx_auto
    , tw_my_4
    , tw_my_8
    , tw_px_4
    , tw_px_6
    , tw_py_12
    , tw_py_2
    , tw_rounded
    , tw_text_2xl
    , tw_text_center
    , tw_text_gray_700
    , tw_text_gray_900
    , tw_text_lg
    , tw_text_red_500
    , tw_text_white
    , tw_text_xl
    , tw_transform
    , tw_transition
    , tw_underline
    , tw_w_1over4
    , tw_w_full
    )

import Svg
import Svg.Attributes as A


classList : List ( Svg.Attribute msg, Bool ) -> List (Svg.Attribute msg)
classList classes =
    List.map Tuple.first <| List.filter Tuple.second classes


tw_container : Svg.Attribute msg
tw_container =
    A.class "tw-container"


tw_form_input : Svg.Attribute msg
tw_form_input =
    A.class "tw-form-input"


tw_form_textarea : Svg.Attribute msg
tw_form_textarea =
    A.class "tw-form-textarea"


tw_form_multiselect : Svg.Attribute msg
tw_form_multiselect =
    A.class "tw-form-multiselect"


tw_form_select : Svg.Attribute msg
tw_form_select =
    A.class "tw-form-select"


tw_form_select____neg_ms_expand : Svg.Attribute msg
tw_form_select____neg_ms_expand =
    A.class "tw-form-select::-ms-expand"


tw_form_checkbox : Svg.Attribute msg
tw_form_checkbox =
    A.class "tw-form-checkbox"


tw_form_checkbox__checked : Svg.Attribute msg
tw_form_checkbox__checked =
    A.class "tw-form-checkbox:checked"


tw_form_checkbox____neg_ms_check : Svg.Attribute msg
tw_form_checkbox____neg_ms_check =
    A.class "tw-form-checkbox::-ms-check"


tw_form_radio : Svg.Attribute msg
tw_form_radio =
    A.class "tw-form-radio"


tw_form_radio__checked : Svg.Attribute msg
tw_form_radio__checked =
    A.class "tw-form-radio:checked"


tw_form_radio____neg_ms_check : Svg.Attribute msg
tw_form_radio____neg_ms_check =
    A.class "tw-form-radio::-ms-check"


tw_bg_blue_500 : Svg.Attribute msg
tw_bg_blue_500 =
    A.class "tw-bg-blue-500"


first__tw_bg_indigo_100 : Svg.Attribute msg
first__tw_bg_indigo_100 =
    A.class "first:tw-bg-indigo-100"


last__tw_bg_indigo_400 : Svg.Attribute msg
last__tw_bg_indigo_400 =
    A.class "last:tw-bg-indigo-400"


hover__tw_bg_blue_700 : Svg.Attribute msg
hover__tw_bg_blue_700 =
    A.class "hover:tw-bg-blue-700"


even__tw_bg_indigo_200 : Svg.Attribute msg
even__tw_bg_indigo_200 =
    A.class "even:tw-bg-indigo-200"


odd__tw_bg_indigo_300 : Svg.Attribute msg
odd__tw_bg_indigo_300 =
    A.class "odd:tw-bg-indigo-300"


tw_rounded : Svg.Attribute msg
tw_rounded =
    A.class "tw-rounded"


tw_block : Svg.Attribute msg
tw_block =
    A.class "tw-block"


tw_flex : Svg.Attribute msg
tw_flex =
    A.class "tw-flex"


tw_inline_flex : Svg.Attribute msg
tw_inline_flex =
    A.class "tw-inline-flex"


tw_items_center : Svg.Attribute msg
tw_items_center =
    A.class "tw-items-center"


tw_font_normal : Svg.Attribute msg
tw_font_normal =
    A.class "tw-font-normal"


hover__tw_font_bold : Svg.Attribute msg
hover__tw_font_bold =
    A.class "hover:tw-font-bold"


tw_text_lg : Svg.Attribute msg
tw_text_lg =
    A.class "tw-text-lg"


tw_text_xl : Svg.Attribute msg
tw_text_xl =
    A.class "tw-text-xl"


tw_text_2xl : Svg.Attribute msg
tw_text_2xl =
    A.class "tw-text-2xl"


tw_my_4 : Svg.Attribute msg
tw_my_4 =
    A.class "tw-my-4"


tw_my_8 : Svg.Attribute msg
tw_my_8 =
    A.class "tw-my-8"


tw_mx_auto : Svg.Attribute msg
tw_mx_auto =
    A.class "tw-mx-auto"


tw_mt_1 : Svg.Attribute msg
tw_mt_1 =
    A.class "tw-mt-1"


tw_mt_2 : Svg.Attribute msg
tw_mt_2 =
    A.class "tw-mt-2"


tw_mb_2 : Svg.Attribute msg
tw_mb_2 =
    A.class "tw-mb-2"


tw_ml_2 : Svg.Attribute msg
tw_ml_2 =
    A.class "tw-ml-2"


tw_mt_4 : Svg.Attribute msg
tw_mt_4 =
    A.class "tw-mt-4"


tw_mb_4 : Svg.Attribute msg
tw_mb_4 =
    A.class "tw-mb-4"


tw_mt_6 : Svg.Attribute msg
tw_mt_6 =
    A.class "tw-mt-6"


tw_ml_6 : Svg.Attribute msg
tw_ml_6 =
    A.class "tw-ml-6"


tw_max_w_xs : Svg.Attribute msg
tw_max_w_xs =
    A.class "tw-max-w-xs"


tw_max_w_3xl : Svg.Attribute msg
tw_max_w_3xl =
    A.class "tw-max-w-3xl"


tw_py_2 : Svg.Attribute msg
tw_py_2 =
    A.class "tw-py-2"


tw_px_4 : Svg.Attribute msg
tw_px_4 =
    A.class "tw-px-4"


tw_px_6 : Svg.Attribute msg
tw_px_6 =
    A.class "tw-px-6"


tw_py_12 : Svg.Attribute msg
tw_py_12 =
    A.class "tw-py-12"


tw_text_center : Svg.Attribute msg
tw_text_center =
    A.class "tw-text-center"


tw_text_white : Svg.Attribute msg
tw_text_white =
    A.class "tw-text-white"


tw_text_gray_700 : Svg.Attribute msg
tw_text_gray_700 =
    A.class "tw-text-gray-700"


tw_text_gray_900 : Svg.Attribute msg
tw_text_gray_900 =
    A.class "tw-text-gray-900"


tw_text_red_500 : Svg.Attribute msg
tw_text_red_500 =
    A.class "tw-text-red-500"


tw_underline : Svg.Attribute msg
tw_underline =
    A.class "tw-underline"


hover__tw_underline : Svg.Attribute msg
hover__tw_underline =
    A.class "hover:tw-underline"


tw_w_1over4 : Svg.Attribute msg
tw_w_1over4 =
    A.class "tw-w-1/4"


tw_w_full : Svg.Attribute msg
tw_w_full =
    A.class "tw-w-full"


tw_transform : Svg.Attribute msg
tw_transform =
    A.class "tw-transform"


hover__tw_scale_110 : Svg.Attribute msg
hover__tw_scale_110 =
    A.class "hover:tw-scale-110"


hover__tw_neg_translate_y_1 : Svg.Attribute msg
hover__tw_neg_translate_y_1 =
    A.class "hover:tw--translate-y-1"


tw_transition : Svg.Attribute msg
tw_transition =
    A.class "tw-transition"


tw_ease_in_out : Svg.Attribute msg
tw_ease_in_out =
    A.class "tw-ease-in-out"


tw_duration_500 : Svg.Attribute msg
tw_duration_500 =
    A.class "tw-duration-500"


test_dot_with_dot_a_dot_dot : Svg.Attribute msg
test_dot_with_dot_a_dot_dot =
    A.class "test.with.a.dot"


fa : Svg.Attribute msg
fa =
    A.class "fa"


fa_minus : Svg.Attribute msg
fa_minus =
    A.class "fa-minus"


fa_plus : Svg.Attribute msg
fa_plus =
    A.class "fa-plus"


lg__tw_bg_green_500 : Svg.Attribute msg
lg__tw_bg_green_500 =
    A.class "lg:tw-bg-green-500"


lg__hover__tw_bg_green_700 : Svg.Attribute msg
lg__hover__tw_bg_green_700 =
    A.class "lg:hover:tw-bg-green-700"
