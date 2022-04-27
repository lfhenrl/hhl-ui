## The grid system

The main idea in this grid system is to use the standard CSS grid and by properties setting grid areas, rows and columns.
It is possible to set different values for screen sizes.

#### Some links to the standard

[CSS TRICKS A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)<br/>
[MDN Web Docs grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)<br/>
[Learn CSS Grid](https://learncssgrid.com/)<br/>

## H_grid

- Use the Vue component `H_grid`.

::: tip
You can edit the code examples.
:::

<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <H_grid grid-lines grid_col="1fr auto 1fr" grid_padding="15px">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
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
In the code examples the H_grid component will have a property `grid-lines` this is only for showing the grids row and columns lines.
Remove this property and the gridlines will disappear.
:::

## Sizing Media Queries

The system gives you the possibility to gives different values depending on the screen size.
It contains 4 types of media breakpoints that are used for targeting specific screen sizes or orientations.

| Value | Describtion     |
| ----- | --------------- |
| `_sm` | Small: > 400px  |
| `_md` | Medium: > 700px |
| `_lg` | Large > 1100px  |

You can use those selectors on the following.<br><br>
**Rows (grid-auto-rows): `grid_row /grid_row_sm /grid_row_md/ grid_row_lg`**<br><br>
**Columns (grid-template-columns): `grid_col /grid_col_sm /grid_col_md/ grid_col_lg`**<br><br>
**Area (grid-template-areas)`: grid_area /grid_area_sm /grid_area_md/ grid_area_lg`**<br><br>
**Gap (gap): `grid_gap /grid_gap_sm /grid_gap_md/ grid_gap_lg`**<br><br>

<br>
So you end with having 4 size levels.
<br>

| Value                               | Describtion                             |
| ----------------------------------- | --------------------------------------- |
| `grid_col="auto"`                   | Exsta small: < 400px will give 1 column |
| `grid_col_sm="auto auto"`           | Small: > 400px will give 2 column       |
| `grid_col_md="auto auto auto"`      | Medium: > 700px will give 3 column      |
| `grid_col_lg="auto auto auto auto"` | Large > 1100px will give 4 column       |

<br>

Try to resize the window to see how it adjusting.<br>
**Properties: `grid_col="auto auto"` `grid_col_md="auto auto auto auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
        <H_grid grid-lines grid_col="auto auto" grid_col_lg="auto auto auto auto" grid_padding="15px">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>3</div>
        </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
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
**Properties `grid_row /grid_row_sm /grid_row_md /grid_row_lg `.**<br>
by default the value is `auto`.

| Value                      | Describtion                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `auto`                     | Default value. Auto adjust the size.                               |
| `(??)px`                   | Sets the size of the rows, by using a legal length.                |
| `minmax(max-content, 1fr)` | Sets the size of each row to depend on the largest item in the row |

### Rows fixed size

Set the size to 50px.<br/>
**Properties: `grid_row="50px"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <H_grid grid-lines grid_row="50px" grid_padding="15px">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
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

In this example the size on row 2 is 50px and then all row will be 100px because it is the highest<br/>
**Properties: `grid_row="minmax(max-content, 1fr)"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <H_grid grid-lines grid_row="minmax(max-content, 1fr)" grid_padding="15px">
        <div>1</div>
        <div style="height: 100px;">2</div>
        <div>3</div>
      </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
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
**Properties `grid_col /grid_col_sm /grid_col_md /grid_col_lg `.**<br>
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

**Properties: `grid_col="auto auto auto auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <H_grid grid-lines grid_col="auto auto auto auto" grid_padding="15px">
        <div style="width:100px">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### auto 1fr 1fr auto

**Properties: `grid_col="auto 1fr 1fr auto"`**
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <H_grid grid-lines grid_col="auto 1fr 1fr auto" grid_padding="15px">
        <div style="width:100px">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### auto 1fr 1fr 150px

**Properties: `grid_col="auto 1fr 1fr 150px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="auto 1fr 1fr 150px" grid_padding="15px">
      <div style="width:100px">1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
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

**Properties: `grid_col="repeat(6, 1fr)"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="repeat(6, 1fr)" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
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

**Properties: `grid_col="repeat(3, minMax(100px, 1fr))"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="repeat(3, minMax(100px, 1fr))" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
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

**Properties: `grid_col="autofit-200"`** syntax autofit-value (0-1000) in pixel.
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="autofit-200" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
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
**Properties `grid_gap /grid_gap_sm /grid_gap_md /grid_gap_lg `.**<br>
The default value is `10px`.
Set the gap between rows and columns.<br/>

- `grid_gap="10px"` Set both rows and column gap to 10px;
- `grid_gap="24px 10px"` Set rows gap to 24px and column gap to 10px;

### gap 10px

**Properties: `grid_gap="10px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="auto auto" grid_gap="10px" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

### gap 30px 10px

**Properties: `grid_gap="30px 10px"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_col="auto auto" grid_gap="30px 10px" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
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

**Properties `grid_area /grid_area_sm /grid_area_md /grid_area_lg `.**<br><br>
All the child element in the grid will get a grid-area name from `c1` up to `c24` in the same order as the dom.<br>
You then define how they should be presentet in the grid like this.<br>

- `"c1 c2 c3, c4 c5 c6"` It will give 2 rows with 3 columns.
- `"c6 c5 c4, c3 c2 c1"` It will give 2 rows with 3 columns but in the opisite order.
- `"c1 c2 ., . c3 c4, c5 . c6` It will give 3 rows with 3 columns with 3 empty cells, the `.` mean an empty cell.

```html
<H_grid grid_area="c1 c2 c3, c4 c5 c6">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</H_grid>
```

<br>

### Area "c1 c2 c3, c4 c5 c6"

**Properties: `grid_area="c1 c2 c3, c4 c5 c6"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_area="c1 c2 c3, c4 c5 c6" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Area "c6 c5 c4, c3 c2 c1"

**Properties: `grid_area="c6 c5 c4, c3 c2 c1"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_area="c6 c5 c4, c3 c2 c1" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Area "c1 c2 ., . c3 c4, c5 . c6"

**Properties: `grid_area="c1 c2 ., . c3 c4, c5 . c6"`**
<hhl-live-editor title="" htmlCode='
    <template>
    <H_grid grid-lines grid_area="c1 c2 ., . c3 c4, c5 . c6" grid_padding="15px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </H_grid>
    </template>
    <xstyle>
      .H_grid {
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>
<br>
<br>
<br>
<br>
<br>
