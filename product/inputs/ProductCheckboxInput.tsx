import React from "react";
import {SimpleGrid, Text, Stack, Button} from "@chakra-ui/core";
import produce from "immer";

import {MultipleOptionItem} from "../types/options";

import Checkbox from "~/ui/inputs/Checkbox";

interface Props {
  options: Props["value"];
  label?: (value: MultipleOptionItem) => string;
  valueProp?: string;
  value?: MultipleOptionItem[];
  limit?: number;
  onChange: (value: Props["value"]) => void;
}

const ProductLimitedCheckboxInput: React.FC<Props> = ({
  limit,
  options,
  label,
  onChange,
  valueProp = "value",
  value = [],
  ...props
}) => {
  const isFull = value?.length >= limit;

  function handleDecrease(option) {
    const index = value.findIndex((selected) => selected[valueProp] === option[valueProp]);

    onChange(
      produce(value, (value) => {
        value.splice(index, 1);
      }),
    );
  }

  function handleIncrease(option) {
    onChange(value.concat(option));
  }

  return (
    <SimpleGrid spacing={3} width="100%" {...props}>
      {options.map((option) => {
        const count = value?.filter((selected) => selected[valueProp] === option[valueProp]).length;
        const isDisabled = isFull && !count;

        return (
          <Checkbox key={option[valueProp]} isChecked={Boolean(count)} isDisabled={isDisabled}>
            <Text>{label(option)}</Text>
            <Stack isInline>
              <Button isDisabled={count === 0} size="xs" onClick={() => handleDecrease(option)}>
                -
              </Button>
              <Text alignSelf="center" minWidth={6} textAlign="center">
                {count}
              </Text>
              <Button isDisabled={isFull} size="xs" onClick={() => handleIncrease(option)}>
                +
              </Button>
            </Stack>
          </Checkbox>
        );
      })}
    </SimpleGrid>
  );
};

export default ProductLimitedCheckboxInput;