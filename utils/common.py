from datetime import datetime
from typing import Union, Optional
import re

def format_date(date_str: str, input_format: str = '%Y-%m-%d') -> Optional[str]:
    """
    Format a date string to a standardized format (YYYY-MM-DD)
    
    Args:
        date_str (str): Date string to format
        input_format (str): Expected format of the input date string
        
    Returns:
        str: Formatted date string or None if invalid
    """
    try:
        date_obj = datetime.strptime(date_str, input_format)
        return date_obj.strftime('%Y-%m-%d')
    except ValueError:
        return None

def is_valid_date(date_str: str, input_format: str = '%Y-%m-%d') -> bool:
    """
    Check if a date string is valid
    
    Args:
        date_str (str): Date string to validate
        input_format (str): Expected format of the input date string
        
    Returns:
        bool: True if date is valid, False otherwise
    """
    return format_date(date_str, input_format) is not None

def format_currency(amount: Union[float, int], currency: str = 'USD', decimals: int = 2) -> str:
    """
    Format a number as currency
    
    Args:
        amount (float|int): Amount to format
        currency (str): Currency code
        decimals (int): Number of decimal places
        
    Returns:
        str: Formatted currency string
    """
    return f"{currency} {amount:,.{decimals}f}"

def format_percentage(value: float, decimals: int = 2) -> str:
    """
    Format a number as percentage
    
    Args:
        value (float): Value to format (0.1 for 10%)
        decimals (int): Number of decimal places
        
    Returns:
        str: Formatted percentage string
    """
    return f"{(value * 100):.{decimals}f}%"

def calculate_percentage_change(old_value: float, new_value: float) -> float:
    """
    Calculate percentage change between two values
    
    Args:
        old_value (float): Original value
        new_value (float): New value
        
    Returns:
        float: Percentage change
    """
    if old_value == 0:
        return float('inf') if new_value > 0 else float('-inf') if new_value < 0 else 0
    return (new_value - old_value) / old_value

def is_valid_stock_symbol(symbol: str) -> bool:
    """
    Validate if a string is a valid stock symbol format
    
    Args:
        symbol (str): Stock symbol to validate
        
    Returns:
        bool: True if valid format, False otherwise
    """
    # Basic validation for common stock symbol formats
    pattern = r'^[A-Z]{1,5}(\.[A-Z]{1,2})?$'
    return bool(re.match(pattern, symbol))

def calculate_moving_average(data: list[float], window: int) -> list[float]:
    """
    Calculate moving average for a list of values
    
    Args:
        data (list[float]): List of numerical values
        window (int): Window size for moving average
        
    Returns:
        list[float]: List of moving averages
    """
    if not data or window <= 0 or window > len(data):
        return []
    
    result = []
    for i in range(len(data) - window + 1):
        window_average = sum(data[i:i + window]) / window
        result.append(window_average)
    return result

def validate_numeric_range(value: float, min_value: float = None, max_value: float = None) -> bool:
    """
    Validate if a number falls within a specified range
    
    Args:
        value (float): Value to validate
        min_value (float, optional): Minimum allowed value
        max_value (float, optional): Maximum allowed value
        
    Returns:
        bool: True if value is within range, False otherwise
    """
    if min_value is not None and value < min_value:
        return False
    if max_value is not None and value > max_value:
        return False
    return True 