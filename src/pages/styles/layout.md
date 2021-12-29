## Disabled.

By adding the attribute `disabled` you set the opacity to 0.6 and set the pointer-events: none; & curser: none;

<hhl-live-editor title="Disabled." htmlCode='
    <template>
    <div class="flx-row flx-wrap flx-align-center">
      <hhl-btn type="outline-raised">Not Disabled</hhl-btn>
      <hhl-btn type="outline-raised" disabled>Disabled</hhl-btn>
    </div>
    </template>
    <xstyle>
      div .hhl-btn {
        margin: 6px;
        width: 120px;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Display.

The display property specifies the display behavior (the type of rendering box) of an element.

| Class          | Properties             | Describtion                                                                                      |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| block          | display: block;        | Block element (like p). It starts on a new line, and takes up the whole width                    |
| block-inline   | display: inline-block; | The element itself is formatted as an inline element, but you can apply height and width values. |
| inline         | display: inline;       | Inline element (like span). Any height and width properties will have no effectelement.          |
| flx-row        | display: flex;         | Displays an element as a block-level flex container.                                             |
| flx-inline-row | display: inline-flex;  | Displays an element as an inline-level flex container.                                           |
| flx-col        | display: flex;         | Displays an element as a block-level flex container.                                             |
| flx-inline-col | display: inline-flex;  | Displays an element as an inline-level flex container.                                           |
| grid           | display: grid;         | Displays an element as a block-level grid container.                                             |
| grid-inline    | display: inline-grid;  | Displays an element as an inline-level flex container.                                           |
| hidden         | display: none;         | Remove it from the page layout.                                                                  |

<br/>

## Opacity.

Utilities for setting the opacaty of an element

| Class       | Properties    | Describtion              |
| ----------- | ------------- | ------------------------ |
| opacity-0   | opacity: 0;   | Set the opacity to 0%.   |
| opacity-10  | opacity: 0.1; | Set the opacity to 10%.  |
| opacity-20  | opacity: 0.2; | Set the opacity to 20%.  |
| opacity-30  | opacity: 0.3; | Set the opacity to 30%.  |
| opacity-40  | opacity: 0.5; | Set the opacity to 40%.  |
| opacity-50  | opacity: 0.5; | Set the opacity to 50%.  |
| opacity-60  | opacity: 0.6; | Set the opacity to 60%.  |
| opacity-70  | opacity: 0.7; | Set the opacity to 70%.  |
| opacity-80  | opacity: 0.8; | Set the opacity to 80%.  |
| opacity-90  | opacity: 0.9; | Set the opacity to 90%.  |
| opacity-100 | opacity: 1;   | Set the opacity to 100%. |

<br/>

## Size.

Utilities for setting the width & Hight of an element

| Class   | Properties     | Describtion                                  |
| ------- | -------------- | -------------------------------------------- |
| h-100vh | height: 100vh; | Set the height to the screen height.         |
| h-100pr | height: 100%;  | Set the height to 100% of the parent height. |
| w-100vw | width: 100vw;  | Set the width to the screen width.           |
| w-100pr | width: 100%;   | Set the width to 100% of the parent width.   |

<br/>

## Overflow.

Utilities for controlling how an element handles content that is too large for the container.

| Class              | Properties           | Describtion                                                                             |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------- |
| overflow-auto      | overflow: auto;      | If overflow is clipped, a scroll-bar should be added to see the rest of the content.    |
| overflow-hidden    | overflow: hidden;    | The overflow is clipped, and the rest of the content will be invisible.                 |
| overflow-visible   | overflow: visible;   | The overflow is not clipped. It renders outside the element's box. **This is default.** |
| overflow-scroll    | overflow: scroll;    | The overflow is clipped, but a scroll-bar is added to see the rest of the content.      |
| overflow-x-auto    | overflow-x: auto;    | Overflows at the left and right edges.                                                  |
| overflow-x-hidden  | overflow-x: hidden;  | Overflows at the left and right edges.                                                  |
| overflow-x-visible | overflow-x: visible; | Overflows at the left and right edges.                                                  |
| overflow-x-scroll  | overflow-x: scroll;  | Overflows at the left and right edges.                                                  |
| overflow-y-auto    | overflow-y: auto;    | Overflows at the top and bottom edges.                                                  |
| overflow-y-hidden  | overflow-y: hidden;  | Overflows at the top and bottom edges.                                                  |
| overflow-y-visible | overflow-y: visible; | Overflows at the top and bottom edges.                                                  |
| overflow-y-scroll  | overflow-y: scroll;  | Overflows at the top and bottom edges.                                                  |

<br/>

## Position.

The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).

| Class    | Properties          | Describtion                                                                              |
| -------- | ------------------- | ---------------------------------------------------------------------------------------- |
| static   | position: static;   | **Default value.** Elements render in order, as they appear in the document flow         |
| fixed    | position: fixed;    | The element is positioned relative to the browser window                                 |
| absolute | position: absolute; | The element is positioned relative to its first positioned (not static) ancestor element |
| relative | position: relative; | The element is positioned relative to its normal position.                               |
| sticky   | position: sticky;   | The element is positioned based on the user's scroll position                            |

<br/>

## Z-Index.

The z-index property specifies the stack order of an element.

An element with greater stack order is always in front of an element with a lower stack order.

Note: z-index only works on positioned elements (position: absolute, position: relative, position: fixed, or position: sticky) and flex items (elements that are direct children of display:flex elements).

| Class | Properties   | Describtion                 |
| ----- | ------------ | --------------------------- |
| z-0   | z-index: 0;  | Sets the stack order to 0.  |
| z-1   | z-index: 1;  | Sets the stack order to 1.  |
| z-2   | z-index: 2;  | Sets the stack order to 2.  |
| z-5   | z-index: 5;  | Sets the stack order to 5.  |
| z-10  | z-index: 10; | Sets the stack order to 10. |
| z-20  | z-index: 20; | Sets the stack order to 20. |
| z-50  | z-index: 50; | Sets the stack order to 50. |

<br/>

## Top / Right / Bottom / Left.

Utilities for controlling the placement of positioned elements.

| Class     | Properties                                         | Describtion                                             |
| --------- | -------------------------------------------------- | ------------------------------------------------------- |
| pos-all-0 | top:0px;<br>right:0px;<br>bottom:0px;<br>left:0px; | Place an absolute element 0 distance to all sides       |
| pos-y-0   | top: 0px;<br>bottom: 0px;                          | Place an absolute element 0 distance to top and bottom. |
| pos-x-0   | right: 0px;<br>left: 0px;                          | Place an absolute element 0 distance to left and right. |
| top-0     | top: 0px;                                          | Place an absolute element 0 distance to top.            |
| top-1     | top: 0.25rem;                                      | Place an absolute element 0.25rem distance to top.      |
| bottom-0  | bottom: 0;                                         | Place an absolute element 0 distance to bottom.         |
| bottom-1  | bottom: 0.25rem;                                   | Place an absolute element 0 distance to bottom.         |
| left-0    | left: 0;                                           | Place an absolute element 0 distance to left.           |
| left-1    | left: 0.25rem;                                     | Place an absolute element 0 distance to left.           |
| right-0   | right: 0;                                          | Place an absolute element 0 distance to right.          |
| right-1   | left: 0.25rem;                                     | Place an absolute element 0 distance to right.          |

<br/>

<style>
table td:first-of-type {
    white-space:nowrap;
}
table td:nth-of-type(2) {
    white-space:pre-wrap;
}

</style>
