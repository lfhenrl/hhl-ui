# Dialog Service

If you add `<H_dialog-service/>` to your "app" page, you vill get a global dialog, Snack/Alert and a EventBus that can be used on all pages.

## Add H_dialog-service

::: warning
It is very important it's only added one time and in the main page (app.vue).
:::

```html
<template>
  <div class="app">
    <div class="app-toolbar">
      <H_btn  @click="menuOpen()">
        <H_icon icon="menu" />
      </H_btn>
    </div>

    <div class="app-menu">
      <router-link to="/">Home</router-link>
      <router-link to="/page-somthing">Something</router-link>
    </div>

    <router-view />

    //// ADDED HERE
    <H_dialog-service />
  </div>
</template>
```

<br>

## Standard dialog

The dialog is a simpel confirmation with a Title, Text and 2 buttons with "OK" and Cancel.<br>
It return a promise with true (OK) or false (cancel).

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
            <H_btn @click="open">Dialog open</H_btn>
      </div>
      </template>
      <script>
      function open() {
         hhl.dialog("I am the Title", "I am the Text !!!!!!!!!!!!!!!!!!!!!!")
          .then(() => {
            alert("You clicked OK");
          })
          .catch(() => {
            alert("You clicked CANCEL");
          });
        }
        return { open }
      </script>
'>
</hhl-live-editor>

<br>

## Dialog Text and Color on buttons

By adding a "buttons" property to the dialog call, you can change the Text and Color of the buttons

The syntax is:
{ok: { Text: 'OK', Color: 'col-pri' }, cancel: { Text: 'CANCEL', Color: 'col-sec' }}

The theme colors are `col-pri` `col-sec` `col-ok` `col-err` `col-warn` `col-info` `col-black` `col-white`<br>
<br>

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
            <H_btn @click="open">Dialog open</H_btn>
      </div>
      </template>
      <script>
      function open() {
         hhl.dialog("Change Text & Color on buttons",
            "By adding a buttons property to the dialog call, you can change the Text and Color of the buttons",
            { ok: { Text: "YES", Color: "col-ok" }, cancel: { Color: "col-err" } })
          .then(() => {
            alert("You clicked OK");
          })
          .catch(() => {
            alert("You clicked CANCEL");
          });
        }
        return { open }
      </script>
'>
</hhl-live-editor>

<br>

## Snack

Snack have 4 properties: <br>
type: "String " "err" | "warn" | "info". The type will change the Color and Icon.<br>
title: "String" For the titel.<br>
text: "String" For the information.<br>
timeout: "Number" the amount of millisecond the snack is open.<br>

<br>

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn @click="open(`info`)">Snack Info</H_btn>
            <H_btn @click="open(`warn`)">Snack Warning</H_btn>
            <H_btn @click="open(`err`)">Snack Error</H_btn>
      </div>
      </template>
      <script>
        function open(val) {
          hhl.alert(val, "TITLE", "Showing information");
          }
          return { open }
      </script>
'>
</hhl-live-editor>

<br>

## Event bus

The Event bus is a function to send a global Event that you can listen on in all VUE component.

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
            <H_btn @click="send">Send event</H_btn>
      </div>
      </template>
      <script>
        hhl.event.on("SomeUnikName", (payload) => {
          alert(payload);
        });
        function send() {
          hhl.event.emit("SomeUnikName", "Hello from event");
          }
          return { send }
      </script>
'>
</hhl-live-editor>

<br>
