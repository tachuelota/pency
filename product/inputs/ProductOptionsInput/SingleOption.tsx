import React from "react";
import {Stack, Input, Button, IconButton, FormLabel, FormHelperText} from "@chakra-ui/core";
import produce from "immer";

import {SingleOption} from "../../types/options";

import {DEFAULT_OPTION} from "./constants";

import FormControl from "~/ui/controls/FormControl";

interface Props {
  index: number;
  value: Partial<SingleOption>;
  error?: string;
  onChange: (option: Partial<SingleOption>) => void;
}

const SingleOptionInput: React.FC<Props> = ({error, value, onChange}) => {
  function handleChange(subindex, prop, newValue) {
    onChange(
      produce(value, (value) => {
        value.options[subindex][prop] = newValue;
      }),
    );
  }

  function handleChangeTitle(event) {
    onChange(
      produce(value, (value) => {
        value.title = event.target.value;
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.options.push(DEFAULT_OPTION.single);
      }),
    );
  }

  function handleRemove(subindex) {
    onChange(
      produce(value, (value) => {
        value.options.splice(subindex, 1);
      }),
    );
  }

  return (
    <Stack spacing={3}>
      <FormControl
        isRequired
        error={error === "title" && !value.title && "Este campo es requerido"}
        help="Tip: Usá una sola palabra"
        label="Título"
      >
        <Input
          placeholder="Título (ej: Salsa)"
          type="text"
          value={value.title}
          onChange={handleChangeTitle}
        />
      </FormControl>
      <Stack spacing={0}>
        {value.options.length && <FormLabel marginBottom={0}>Sub opciones</FormLabel>}
        <Stack spacing={2}>
          {value.options.map((option, subindex) => (
            <Stack key={option.id} isInline spacing={2}>
              <FormControl
                error={error === "optionsTitle" && !option.title && "Este campo es requerido"}
                width="100%"
              >
                <Input
                  autoFocus
                  placeholder="Título"
                  value={option.title}
                  onChange={(event) => handleChange(subindex, "title", event.target.value)}
                />
              </FormControl>
              <FormControl
                error={error === "optionsPrice" && !option.price && "Este campo es requerido"}
                flexShrink={2}
                width="100%"
              >
                <Input
                  placeholder="Precio"
                  type="number"
                  value={option.price}
                  onChange={(event) =>
                    handleChange(
                      subindex,
                      "price",
                      event.target.value ? Number(event.target.value) : "",
                    )
                  }
                />
              </FormControl>
              {value.options.length > 1 && (
                <IconButton
                  aria-label="Borrar sub opción"
                  icon="delete"
                  variant="ghost"
                  variantColor="red"
                  onClick={() => handleRemove(subindex)}
                />
              )}
            </Stack>
          ))}
        </Stack>
        <FormHelperText>
          El precio indicado se sumará al valor base del producto, si la opción no modifica el
          precio, dejá 0.
        </FormHelperText>
      </Stack>
      <Button size="sm" variant="ghost" variantColor="primary" onClick={handleAdd}>
        Agregar sub opción
      </Button>
    </Stack>
  );
};

export default SingleOptionInput;
