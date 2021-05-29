## The grid system

The main idea in this grid system is to use the standard CSS grid by specifies named grid areas.
For different screen sizes it using css variable for defining the layout

#### Some links to the standard

[CSS TRICKS A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)<br/>
[MDN Web Docs grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)<br/>
[Learn CSS Grid](https://learncssgrid.com/)<br/>

## CSS or Component

There are 2 ways to use the grid-system.

- Adding the CSS class `gridBox`.
- Use the Vue component `hhl-layout`.

::: tip
You can edit the code examples.
:::

### By Class.

<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <div class="gridBox demoGrid">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </template>
    <xstyle>
      .demoGrid {
        padding: 20px 10px;
        --grid-gap:10px;
        --grid-col: 1fr auto 1fr
      }
      .gridBox > div {
        height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### By Component.

<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <hhl-layout gap="10px" col="1fr auto 1fr">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

::: warning
The following examples will only show the component version.
:::

::: warning
In the code examples the hhl-layout component will have a property `grid-lines` this is only for showing the grids row and columns lines.
Remove this property and the gridlines will disappear.
:::

## Sizing Media Queries

The system gives you the possibility to gives different values depending on the screen size.
It contains 4 types of media breakpoints that are used for targeting specific screen sizes or orientations.

| Value | Describtion            |
| ----- | ---------------------- |
| `-sm` | Small: 600px > < 960px |
| `-md` | Medium: 960px > < 1264 |
| `-lg` | Large 1264 >           |

It can be used like this `col:"auto auto"` `col-md:"auto auto auto auto"` will gives you 4 columns for screens
larger than 600px and 2 columns for smaller than 600px.

::: warning
Alwais start with `row` and `col` or the other properties and if needet add values for the other sizes.
:::
<br>

Try to resize the window to see how it adjusting.<br>
**CSS Class: `--grid-col: auto auto` `--grid-col-md: auto auto auto auto`** <br>
**Component: `col="auto auto"` `col-md="auto auto auto auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
        <hhl-layout grid-lines col="auto auto" col-lg="auto auto auto auto">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>3</div>
        </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    <x/style>
'>
</hhl-live-editor>
<br/>

## Rows

You control the rows by the<br>
**CSS variable `--grid-row`/-sm/-md/-lg.**<br>
**Component `row`/-sm/-md/-lg.**<br>
by default the value is `auto`.

| Value                      | Describtion                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `auto`                     | Default value. Auto adjust the size.                               |
| `(??)px`                   | Sets the size of the rows, by using a legal length.                |
| `minmax(max-content, 1fr)` | Sets the size of each row to depend on the largest item in the row |

### Rows fixed size

Set the size to 50px.<br/> **CSS Class: `--grid-row: 50px`** <br/> **Component: `row="50px"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <hhl-layout grid-lines row="50px">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
        .gridBox > div {
        height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### Rows max-content

Will set the row hight to the highest content.

In this example the size on row 2 is 50px and then all row will be 50px because it is the highest<br/>
**CSS Class: `--grid-row: minmax(max-content, 1fr)`** <br/>
**Component: `row="minmax(max-content, 1fr)"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <hhl-layout grid-lines row="minmax(max-content, 1fr)">
        <div>1</div>
        <div style="height: 50px;">2</div>
        <div>3</div>
      </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
        .gridBox > div {
        height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Columns

You control the columns by the<br>
**CSS variable `--grid-col`/-sm/-md/-lg..** <br>
**Component `col`/-sm/-md/-lg..**<br>
by default the value is `auto`.<br/>
The property specifies the number (and the widths) of columns in a grid layout.
The values are a space separated list, where each value specifies the size of the respective column.

| Value    | Describtion                                                   |
| -------- | ------------------------------------------------------------- |
| `auto`   | Default value. Auto adjust the size.                          |
| `(??)px` | Sets the size of the column, by using a legal length.         |
| `(??)fr` | Sets a fraction of the available space in the grid container. |

::: tip
Try to resize the window to see how the columns adjust.
:::

### auto auto auto auto

**CSS Class: `--grid-col: auto auto auto auto`** <br/>
**Component: `col="auto auto auto auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <hhl-layout grid-lines col="auto auto auto auto">
        <div style="width:100px">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
        .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### auto 1fr 1fr auto

**CSS Class: `--grid-col: auto 1fr 1fr auto`** <br/>
**Component: `col="auto 1fr 1fr auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <hhl-layout grid-lines col="auto 1fr 1fr auto">
        <div style="width:100px">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### auto 1fr 1fr 150px

**CSS Class: `--grid-col: auto 1fr 1fr 150px`** <br/>
**Component: `col="auto 1fr 1fr 150px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="auto 1fr 1fr 150px">
      <div style="width:100px">1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### repeat(6, 1fr)

With repeat you can make it more simpel to set the same size.

**CSS Class: `--grid-col: repeat(6, 1fr)`** <br/>
**Component: `col="repeat(6, 1fr)"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="repeat(6, 1fr)">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### repeat(3, minMax(100px, 1fr))

With minMax you can specify the min size of the columns

**CSS Class: `--grid-col: repeat(3, minMax(100px, 1fr))`** <br/>
**Component: `col="repeat(3, minMax(100px, 1fr))"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="repeat(3, minMax(100px, 1fr))">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### autofit-200

With the autofit the grid will automatic add rows and columns when the space is availble.
It will remove columns when the size go under the min size (200px here).

**CSS Class: `--grid-col: repeat(auto-fit, minMax(200px, 1fr))`** <br/>
**Component: `col="autofit-200"`** syntax autofit-value (0-1000) in pixel.
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="autofit-200">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Gaps

You control the gap between rows and columns by the<br>
**CSS variable `--gap`/-sm/-md/-lg.**<br>
**Component `gap`/-sm/-md/-lg.**<br>
The default value is `24px`.
Set the gap between rows and columns.<br/>

- `gap="10px"` Set both rows and column gap to 10px;
- `gap="24px 10px"` Set rows gap to 24px and column gap to 10px;

### gap 10px

**CSS Class: `--grid-gap: 10px`** <br/>
**Component: `gap="10px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="autofit-200" gap="10px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### gap 30px 10px

**CSS Class: `--grid-gap: 30px 10px`** <br/>
**Component: `gap="30px 10px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines col="autofit-200" gap="30px 10px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Area
Another powerful and intuitive way to define a grid layout is to use the grid area system.
You control the column and rows layout by<br> 
__CSS variable `--grid-area`/-sm/-md/-lg.__ You need to add the class `gridBox_autoName` to use it with in the CLASS way<br>
__Component `area`/-sm/-md/-lg.__<br><br>
All the child element in the grid will get a grid-area name from `c1` up to `c24` in the same order as the dom.<br>
You then define how they should be presentet in the grid like this.<br>
- `"c1 c2 c3" "c4 c5 c6"` It will give 2 rows with 3 columns.
- `"c6 c5 c4" "c3 c2 c1"` It will give 2 rows with 3 columns but in the opisite order.
- `"c1 c2 ." ". c3 c4" "c5 . c6` It will give 3 rows with 3 columns with 3 empty cells, the `.` mean an empty cell.

__The CSS way.__
```html
  <div class="gridBox gridBox_autoName demoGrid">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
  <style>
    .demoGrid {
      --grid-area: "c1 c2 c3" "c4 c5 c6";
    }
</style>
```
::: warning
It is very important to remember to add the css `gridBox autoName` when you use the CSS way.
The Component do it automatically
:::
<br>

__The Component way.__
```html
  <hhl-layout area="c1 c2 c3, c4 c5 c6">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </
  ```
<br>

### Area "c1 c2 c3, c4 c5 c6"
__CSS: `--grid-area: "c1 c2 c3" "c4 c5 c6";`__ <br/> 
__Component: `area="c1 c2 c3, c4 c5 c6"`__ 
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines area="c1 c2 c3, c4 c5 c6">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Area "c6 c5 c4, c3 c2 c1"
__CSS: `--grid-area: "c6 c5 c4" "c3 c2 c1";`__ <br/> 
__Component: `area="c6 c5 c4, c3 c2 c1"`__ 
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines area="c6 c5 c4, c3 c2 c1">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Area "c1 c2 ., . c3 c4, c5 . c6"
__CSS: `--grid-area: "c1 c2 ." ". c3 c4" "c5 . c6";`__ <br/> 
__Component: `area="c1 c2 ., . c3 c4, c5 . c6"`__ 
<hhl-live-editor title="" htmlCode='
    <template>
    <hhl-layout grid-lines area="c1 c2 ., . c3 c4, c5 . c6">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </hhl-layout>
    </template>
    <xstyle>
      .gridBox {
        padding: 20px 10px;
      }
      .gridBox > div {
        height: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
